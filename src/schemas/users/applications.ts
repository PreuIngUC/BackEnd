import { z } from 'zod'
import { UserSchema, StaffProfileSchema, StudentProfileSchema } from '../../generated/zod'

const UserInput = UserSchema.omit({
    id: true,
    auth0Id: true,
    createdAt: true,
})

const StaffInput = StaffProfileSchema.omit({
    id: true,
    userId: true,
    applicationState: true,
})

const StudentInput = StudentProfileSchema.omit({
    id: true,
    userId: true,
    applicationState: true
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