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

export type StaffApplicationDtoType = z.infer<typeof StaffApplicationDto>

export type StudentApplicationDtoType = z.infer<typeof StudentApplicationDto>
