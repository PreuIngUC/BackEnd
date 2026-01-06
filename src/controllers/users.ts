import type { BodyContext, ParamsContext, VoidContext } from '../types/context.js'
import type {
  StaffApplicationDtoType,
  StudentApplicationDtoType,
  ApplicationAcceptanceParamsDtoType,
  AccountsCreationStepParamsDtoType,
} from '../schemas/users/applications.js'
import DbApi from '../services/dbApi.js'
import AuthApi from '../services/authApi.js'
import { ApplicationError } from '../utils/errors/applications.js'
import axios from 'axios'
import RoleId from '../constants/roles.js'

const userService = DbApi.getInstance().user()
const studentProfileService = DbApi.getInstance().studentProfile()
const staffProfileService = DbApi.getInstance().staffProfile()
const creationJobService = DbApi.getInstance().creationJob()
const creationJobItemService = DbApi.getInstance().creationJobItem()

//TODO: agregar lógica compleja: caso en que la persona ya había hecho su postulación (ya está en la DB)
//FIXME: si la postulación permitiera reescribir podría modificar a usuarios que ya fueron aceptados

export async function createStaffApplication(ctx: BodyContext<StaffApplicationDtoType>) {
  const { user, staff } = ctx.request.body
  const newUser = await userService.create({
    data: {
      ...user,
      staffProfile: {
        create: {
          ...staff,
        },
      },
    },
    include: {
      staffProfile: true,
    },
  })
  ctx.status = 201
  ctx.body = newUser
}

export async function createStudentApplication(ctx: BodyContext<StudentApplicationDtoType>) {
  const { user, student } = ctx.request.body
  const newUser = await userService.create({
    data: {
      ...user,
      studentProfile: {
        create: {
          ...student,
        },
      },
    },
    include: {
      studentProfile: true,
    },
  })
  ctx.status = 201
  ctx.body = newUser
}

export async function acceptStudent(ctx: ParamsContext<ApplicationAcceptanceParamsDtoType>) {
  const userId = ctx.params.id
  const studentProfile = await studentProfileService.findFirst({
    where: {
      userId,
    },
  })
  if (!studentProfile) {
    throw new ApplicationError('student', 'existance')
  }
  if (studentProfile.applicationState !== 'PENDING_AS_STUDENT') {
    throw new ApplicationError('student', 'status')
  }
  await studentProfileService.update({
    where: {
      id: studentProfile.id,
    },
    data: {
      applicationState: 'ACCEPTED_AS_STUDENT',
    },
  })
  ctx.status = 204
}

export async function acceptStaff(ctx: ParamsContext<ApplicationAcceptanceParamsDtoType>) {
  const userId = ctx.params.id
  const staffProfile = await staffProfileService.findFirst({
    where: {
      userId,
    },
  })
  if (!staffProfile) {
    throw new ApplicationError('staff', 'existance')
  }
  if (staffProfile.applicationState !== 'PENDING_AS_STAFF') {
    throw new ApplicationError('staff', 'status')
  }
  await staffProfileService.update({
    where: {
      id: staffProfile.id,
    },
    data: {
      applicationState: 'ACCEPTED_AS_STAFF',
    },
  })
  ctx.status = 204
}

//NOTE: si tuvieramos volúmenes muy grandes (cientos) de estudiantes aceptados,
// sería mejor crear jobs con pocos estudiantes (agregar take al buscar los estudiantes)
async function startAccountsCreation(ctx: VoidContext, type: 'staff' | 'student') {
  const profile = type === 'staff' ? 'staffProfile' : 'studentProfile'
  const applicationState = type === 'staff' ? 'ACCEPTED_AS_STAFF' : 'ACCEPTED_AS_STUDENT'
  const target = type === 'staff' ? 'STAFF' : 'STUDENTS'
  const result = await DbApi.getInstance()
    .getPrisma()
    .$transaction(async tx => {
      const users = await tx.user.findMany({
        where: {
          auth0Id: null,
          [profile]: {
            some: {
              applicationState,
            },
          },
          creationJobItem: {
            none: {
              status: {
                in: ['PENDING', 'RUNNING'],
              },
            },
          },
        },
        select: {
          id: true,
        },
      })
      if (users.length <= 0) {
        throw new Error('No hay postulantes sin cuenta')
      }
      const creator = await tx.user.findUnique({
        where: {
          auth0Id: ctx.state.user?.sub,
        },
      })
      if (!creator) {
        throw new Error('El usuario que envió la solicitud no existe en la DB')
      }
      const job = await tx.creationJob.create({
        data: {
          creatorId: creator.id,
          target,
          status: 'PENDING',
        },
      })
      await tx.creationJobItem.createMany({
        data: users.map(u => {
          return {
            userId: u.id,
            jobId: job.id,
            status: 'PENDING',
            target,
          }
        }),
      })
      return job.id
    })
  ctx.status = 201
  ctx.body = { jobId: result }
}

export async function startStudentsCreation(ctx: VoidContext) {
  return startAccountsCreation(ctx, 'student')
}

export async function startStaffCreation(ctx: VoidContext) {
  return startAccountsCreation(ctx, 'staff')
}

async function jobVerifyForAccCreation(jobId: string, type: 'staff' | 'student') {
  const job = await creationJobService.findUnique({
    where: {
      id: jobId,
    },
    select: {
      status: true,
      target: true,
    },
  })
  if (!job) {
    throw new Error('El job dado no existe')
  }
  if (
    (job.target === 'STAFF' && type !== 'staff') ||
    (job.target === 'STUDENTS' && type !== 'student')
  ) {
    throw new Error('El job entregado no es para el rol indicado')
  }
  if (job.status === 'PENDING') {
    await creationJobService.update({
      where: {
        id: jobId,
      },
      data: {
        status: 'RUNNING',
      },
    })
  }
}

const usersPerStep = 10

async function accountsCreationStep(
  ctx: ParamsContext<AccountsCreationStepParamsDtoType>,
  type: 'staff' | 'student',
) {
  const jobId = ctx.params.jobId
  await jobVerifyForAccCreation(jobId, type)
  const users = await userService.findMany({
    where: {
      auth0Id: null,
      creationJobItem: {
        some: {
          jobId,
          status: 'PENDING',
        },
      },
    },
    take: usersPerStep,
  })
  const api = AuthApi.getInstance()
  const profile = type === 'staff' ? 'staffProfile' : 'studentProfile'
  let created = 0
  let haveErrors = 0
  for (const u of users) {
    try {
      const user = await api.createAccount(u.email)
      await userService.update({
        where: {
          id: u.id,
        },
        data: {
          auth0Id: user.data.user_id,
          creationJobItem: {
            updateMany: {
              where: {
                jobId,
              },
              data: {
                status: 'DONE',
              },
            },
          },
          [profile]: {
            updateMany: {
              where: {},
              data: {
                applicationState: 'CREATED',
              },
            },
          },
        },
      })
      await api.assignRoles(user.data.user_id, [RoleId[type]])
      created++
    } catch (err) {
      let errString
      if (axios.isAxiosError(err)) {
        errString = JSON.stringify(
          {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          },
          null,
          2,
        )
      } else {
        errString = JSON.stringify(err, Object.getOwnPropertyNames(err))
      }
      await userService.update({
        where: {
          id: u.id,
        },
        data: {
          creationJobItem: {
            updateMany: {
              where: {
                jobId,
              },
              data: {
                status: 'DONE_WITH_ERRORS',
                error: errString,
              },
            },
          },
        },
      })
      haveErrors++
    }
    if (created + haveErrors < usersPerStep) {
      const total = await creationJobItemService.count({
        where: {
          jobId,
        },
      })
      const done = await creationJobItemService.count({
        where: {
          jobId,
          status: 'DONE',
        },
      })
      const done_with_errors = await creationJobItemService.count({
        where: {
          jobId,
          status: 'DONE_WITH_ERRORS',
        },
      })
      if (done + done_with_errors >= total && done_with_errors > 0) {
        await creationJobService.update({
          where: {
            id: jobId,
          },
          data: {
            status: 'DONE_WITH_ERRORS',
          },
        })
      } else if (done + done_with_errors >= total) {
        await creationJobService.update({
          where: {
            id: jobId,
          },
          data: {
            status: 'DONE',
          },
        })
      }
      ctx.status = 201
      ctx.body = { created, haveErrors, stepsAvailable: false }
    }
    ctx.status = 201
    ctx.body = { created, haveErrors, stepsAvailable: true }
  }
}

export async function studentsCreationStep(ctx: ParamsContext<AccountsCreationStepParamsDtoType>) {
  return accountsCreationStep(ctx, 'student')
}

export async function staffCreationStep(ctx: ParamsContext<AccountsCreationStepParamsDtoType>) {
  return accountsCreationStep(ctx, 'staff')
}
