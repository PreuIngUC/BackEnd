import { z } from 'zod'
import {
  SectionSchema,
  SectionEnrolmentSchema,
  UserSchema,
  ScheduleSchema,
  CourseSchema,
} from '../../generated/zod/index.js'

export const CreateSectionResponseDto = SectionSchema

export const GetSectionResponseDto = SectionSchema.extend({
  members: UserSchema.pick({
    id: true,
    names: true,
    lastName0: true,
    lastName1: true,
  })
    .extend({
      role: SectionEnrolmentSchema.shape.role,
    })
    .array(),
  schedules: ScheduleSchema.array(),
})

export const GetSectionsResponseDto = z.object({
  sections: SectionSchema.extend({
    courseName: CourseSchema.shape.name,
  }).array(),
})

export const EditSectionResponseDto = SectionSchema

export const CreateSectionEnrolmentResponseDto = SectionEnrolmentSchema

export type CreateSectionResponseDtoType = z.infer<typeof CreateSectionResponseDto>

export type GetSectionResponseDtoType = z.infer<typeof GetSectionResponseDto>

export type GetSectionsResponseDtoType = z.infer<typeof GetSectionsResponseDto>

export type EditSectionResponseDtoType = z.infer<typeof EditSectionResponseDto>

export type CreateSectionEnrolmentResponseDtoType = z.infer<
  typeof CreateSectionEnrolmentResponseDto
>
