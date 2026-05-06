import { z } from 'zod'
import {
  CourseEnrolmentSchema,
  CourseSchema,
  SectionSchema,
  UserSchema,
} from '../../generated/zod/index.js'

export const CreateCourseResponseDto = CourseSchema

export const GetCourseResponseDto = CourseSchema.extend({
  staff: UserSchema.pick({
    id: true,
    names: true,
    lastName0: true,
    lastName1: true,
  })
    .extend({
      role: CourseEnrolmentSchema.shape.role,
      courseEnrolmentId: CourseEnrolmentSchema.shape.id,
      active: z.boolean(),
    })
    .array(),
  sections: SectionSchema.pick({
    id: true,
    name: true,
  }).array(),
})

export const GetCoursesResponseDto = z.object({
  courses: CourseSchema.pick({
    id: true,
    name: true,
    startDate: true,
    endDate: true,
    finished: true,
  }).array(),
})

export const GetCourseSectionsResponseDto = z.object({
  sections: SectionSchema.pick({
    id: true,
    name: true,
  }).array(),
})

export const EditCourseResponseDto = CourseSchema

export const CreateCourseEnrolmentResponseDto = CourseEnrolmentSchema

export const GetCoursesAvailableForApplicationsResponseDto = z.object({
  courses: CourseSchema.pick({
    id: true,
    name: true,
    openForTeachers: true,
    openForCoordinators: true,
  }).array(),
})

export type CreateCourseResponseDtoType = z.infer<typeof CreateCourseResponseDto>
export type GetCourseResponseDtoType = z.infer<typeof GetCourseResponseDto>
export type GetCoursesResponseDtoType = z.infer<typeof GetCoursesResponseDto>
export type CreateCourseEnrolmentResponseDtoType = z.infer<typeof CreateCourseEnrolmentResponseDto>
export type EditCourseResponseDtoType = z.infer<typeof EditCourseResponseDto>
export type GetCourseSectionsResponseDtoType = z.infer<typeof GetCourseSectionsResponseDto>
export type GetCoursesAvailableForApplicationsResponseDtoType = z.infer<
  typeof GetCoursesAvailableForApplicationsResponseDto
>
