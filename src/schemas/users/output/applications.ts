import { z } from 'zod'
import {
  UserSchema,
  StudentProfileSchema,
  StaffProfileSchema,
  CreationJobSchema,
} from '../../../generated/zod/index.js'

const StudentAndApplicationStateDto = UserSchema.pick({
  id: true,
  names: true,
  lastName0: true,
  lastName1: true,
}).extend({
  studentProfile: z.object({
    applicationState: StudentProfileSchema.shape.applicationState.extract([
      'ACCEPTED_AS_STUDENT',
      'PENDING_AS_STUDENT',
      'REJECTED_AS_STUDENT',
    ]),
  }),
})

export const GetStudentApplicationsResDto = z.object({
  users: z.array(StudentAndApplicationStateDto),
})

const StaffAndApplicationStateDto = UserSchema.pick({
  id: true,
  names: true,
  lastName0: true,
  lastName1: true,
}).extend({
  staffProfile: z.object({
    applicationState: StaffProfileSchema.shape.applicationState.extract([
      'ACCEPTED_AS_STAFF',
      'PENDING_AS_STAFF',
      'REJECTED_AS_STAFF',
    ]),
  }),
})

export const GetStaffApplicationsResDto = z.object({
  users: z.array(StaffAndApplicationStateDto),
})

export const GetStudentApplicationResDto = z.object({
  user: UserSchema.extend({
    studentProfile: StudentProfileSchema.omit({
      id: true,
      userId: true,
    }),
  }),
})

export const GetStaffApplicationResDto = z.object({
  user: UserSchema.extend({
    staffProfile: StaffProfileSchema.omit({
      id: true,
      userId: true,
    }),
  }),
})

export const GetAcceptedUsersResDto = z.object({
  users: z.array(
    UserSchema.pick({
      id: true,
      names: true,
      lastName0: true,
      lastName1: true,
    }),
  ),
})

export const StartAccountsCreationResDto = z.object({
  jobId: z.uuid(),
})

export const AccountsCreationStepResDto = z.object({
  created: z.number().int().nonnegative(),
  haveErrors: z.number().int().nonnegative(),
  stepsAvailable: z.boolean(),
})

export const ReadJobsStatusResDto = CreationJobSchema.pick({
  status: true,
})

export type GetStudentApplicationsResDtoType = z.infer<typeof GetStudentApplicationsResDto>

export type GetStaffApplicationsResDtoType = z.infer<typeof GetStaffApplicationsResDto>

export type GetStudentApplicationResDtoType = z.infer<typeof GetStudentApplicationResDto>

export type GetStaffApplicationResDtoType = z.infer<typeof GetStaffApplicationResDto>

export type GetAcceptedUsersResDtoType = z.infer<typeof GetAcceptedUsersResDto>

export type StartAccountsCreationResDtoType = z.infer<typeof StartAccountsCreationResDto>

export type AccountsCreationStepResDtoType = z.infer<typeof AccountsCreationStepResDto>

export type ReadJobsStatusResDtoType = z.infer<typeof ReadJobsStatusResDto>
