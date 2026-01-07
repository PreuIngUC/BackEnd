import type { BodyContext, ParamsContext, VoidContext } from '../types/context.js'
import type {
  StaffApplicationDtoType,
  StudentApplicationDtoType,
  ApplicationAcceptanceParamsDtoType,
  VerifyThenPasswordBodyDtoType,
} from '../schemas/users/applications.js'
import DbApi from '../services/dbApi.js'
import AuthApi from '../services/authApi.js'
import { ApplicationError } from '../utils/errors/applications.js'

const userService = DbApi.getInstance().user()
const studentProfileService = DbApi.getInstance().studentProfile()
const staffProfileService = DbApi.getInstance().staffProfile()

//TODO GENERAL: Agregar errores específicos

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

async function getApplications(type: 'staff' | 'student') {
  const profile = type === 'staff' ? 'staffProfile' : 'studentProfile'
  const users = await userService.findMany({
    where: {
      [profile]: {
        applicationState: type === 'staff' ? 'PENDING_AS_STAFF' : 'PENDING_AS_STUDENT',
      },
    },
    include: {
      [profile]: true,
    },
    omit: {
      auth0Id: true,
    },
  })
  return users
}

export async function getStudentApplications(ctx: VoidContext) {
  const users = await getApplications('student')
  ctx.status = 200
  ctx.body = {
    users,
  }
}

export async function getStaffApplications(ctx: VoidContext) {
  const users = await getApplications('staff')
  ctx.status = 200
  ctx.body = {
    users,
  }
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

async function getAcceptedUsers(type: 'staff' | 'student') {
  const profile = type === 'staff' ? 'staffProfile' : 'studentProfile'
  const users = userService.findMany({
    where: {
      [profile]: {
        applicationState: type === 'staff' ? 'ACCEPTED_AS_STAFF' : 'ACCEPTED_AS_STUDENT',
      },
    },
  })
  return users
}

export async function getAcceptedStudents(ctx: VoidContext) {
  const users = await getAcceptedUsers('student')
  ctx.status = 200
  ctx.body = {
    users,
  }
}

export async function getAcceptedStaff(ctx: VoidContext) {
  const users = await getAcceptedUsers('staff')
  ctx.status = 200
  ctx.body = {
    users,
  }
}

export async function verifyThenChangePassword(ctx: BodyContext<VerifyThenPasswordBodyDtoType>) {
  const rut = ctx.request.body.rut
  const user = await userService.findUnique({
    where: {
      rut,
    },
    select: {
      id: true,
      email: true,
      staffProfile: {
        select: {
          applicationState: true,
        },
      },
      studentProfile: {
        select: {
          applicationState: true,
        },
      },
    },
  })
  if (!user) {
    throw new Error('Usuario no existe')
  }
  if (!user.staffProfile && !user.studentProfile) {
    throw new Error('El usuario no tiene un perfil')
  }
  if (
    user.staffProfile?.applicationState === 'ACTIVE' ||
    user.studentProfile?.applicationState === 'ACTIVE'
  ) {
    throw new Error('Este usuario ya está activo, ya tiene contraseña.')
  }
  if (
    user.staffProfile?.applicationState !== 'CREATED' &&
    user.studentProfile?.applicationState !== 'CREATED'
  ) {
    throw new Error('Este usuario no ha sido creado todavía en Auth0.')
  }
  const profile =
    user.staffProfile?.applicationState === 'CREATED' ? 'staffProfile' : 'studentProfile'
  await AuthApi.getInstance().triggerPassWordChange(user.email)
  await userService.update({
    where: {
      id: user.id,
    },
    data: {
      [profile]: {
        update: {
          data: {
            applicationState: 'ACTIVE',
          },
        },
      },
    },
  })
  ctx.status = 204
}
