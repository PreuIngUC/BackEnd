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

export const ApplicationAcceptanceParamsDto = UserSchema.pick({
  id: true,
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

export type StaffApplicationDtoType = z.infer<typeof StaffApplicationDto>

export type StudentApplicationDtoType = z.infer<typeof StudentApplicationDto>

export type ApplicationAcceptanceBodyDtoType = z.infer<typeof ApplicationAcceptanceBodyDto>

export type ApplicationAcceptanceParamsDtoType = z.infer<typeof ApplicationAcceptanceParamsDto>

export type AccountsCreationStepParamsDtoType = z.infer<typeof AccountsCreationStepParamsDto>

export type VerifyThenPasswordBodyDtoType = z.infer<typeof VerifyThenPasswordBodyDto>
