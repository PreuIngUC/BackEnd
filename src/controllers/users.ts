import type { BodyContext, ParamsContext } from '../types/context.js'
import type {
  StaffApplicationDtoType,
  StudentApplicationDtoType,
  ApplicationAcceptanceParamsDtoType,
} from '../schemas/users/applications.js'
import DbApi from '../services/dbApi.js'
import { ApplicationError } from '../utils/errors/applications.js'

const userService = DbApi.getInstance().user()
const studentProfileService = DbApi.getInstance().studentProfile()
const staffProfileService = DbApi.getInstance().staffProfile()

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
