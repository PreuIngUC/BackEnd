import { z } from 'zod'
import { UserSchema, StaffProfileSchema, StudentProfileSchema } from '../../generated/zod/index.js'
import rutVerify from '../../utils/rutVerify.js'

const UserInput = UserSchema.omit({
  id: true,
  auth0Id: true,
  createdAt: true,
}).extend({
  rut: z.string().refine(rutVerify, 'RUT inválido'),
})

const StaffInput = StaffProfileSchema.omit({
  id: true,
  userId: true,
  applicationState: true,
})

const StudentInput = StudentProfileSchema.omit({
  id: true,
  userId: true,
  applicationState: true,
})

export const StaffApplicationDto = z.object({
  user: UserInput,
  staff: StaffInput,
})

export const StudentApplicationDto = z.object({
  user: UserInput,
  student: StudentInput,
})

export const ApplicationAcceptanceBodyDto = StudentProfileSchema.pick({
  applicationState: true,
})

export const StaffApplicationStateChangeParamsDto = z.object({
  id: UserSchema.shape.id,
  applicationState: StaffProfileSchema.shape.applicationState.extract([
    'PENDING_AS_STAFF',
    'ACCEPTED_AS_STAFF',
    'REJECTED_AS_STAFF',
  ]),
})

export const StudentApplicationStateChangeParamsDto = z.object({
  id: UserSchema.shape.id,
  applicationState: StudentProfileSchema.shape.applicationState.extract([
    'PENDING_AS_STUDENT',
    'ACCEPTED_AS_STUDENT',
    'REJECTED_AS_STUDENT',
  ]),
})

export const AccountsCreationStepParamsDto = z.object({
  jobId: z.uuid(),
})

export const VerifyThenPasswordBodyDto = UserSchema.omit({
  id: true,
  auth0Id: true,
  names: true,
  lastName0: true,
  lastName1: true,
  email: true,
  createdAt: true,
})

export const GetApplicationParamsDto = UserSchema.pick({
  id: true,
})

export type StaffApplicationDtoType = z.infer<typeof StaffApplicationDto>

export type StudentApplicationDtoType = z.infer<typeof StudentApplicationDto>

export type ApplicationAcceptanceBodyDtoType = z.infer<typeof ApplicationAcceptanceBodyDto>

export type StaffApplicationStateChangeParamsDtoType = z.infer<
  typeof StaffApplicationStateChangeParamsDto
>

export type StudentApplicationStateChangeParamsDtoType = z.infer<
  typeof StudentApplicationStateChangeParamsDto
>

export type AccountsCreationStepParamsDtoType = z.infer<typeof AccountsCreationStepParamsDto>

export type VerifyThenPasswordBodyDtoType = z.infer<typeof VerifyThenPasswordBodyDto>

export type GetApplicationParamsDtoType = z.infer<typeof GetApplicationParamsDto>
