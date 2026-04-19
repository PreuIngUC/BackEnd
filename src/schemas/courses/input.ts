import { z } from 'zod'
import { CourseSchema, CourseEnrolmentSchema } from '../../generated/zod/index.js'

export const CreateCourseDto = CourseSchema.omit({
  id: true,
  createdAt: true,
})

export const GetCourseParamsDto = CourseSchema.pick({
  id: true,
})

export const CreateCourseEnrolmentDto = CourseEnrolmentSchema.omit({
  id: true,
  createdAt: true,
})

export const EditCourseBodyDto = CourseSchema.omit({
  id: true,
  createdAt: true,
}).partial()

export const EditCourseParamsDto = z.object({
  id: CourseSchema.shape.id,
})

export type CreateCourseDtoType = z.infer<typeof CreateCourseDto>
export type CreateCourseEnrolmentDtoType = z.infer<typeof CreateCourseEnrolmentDto>
export type GetCourseParamsDtoType = z.infer<typeof GetCourseParamsDto>
export type EditCourseBodyDtoType = z.infer<typeof EditCourseBodyDto>
export type EditCourseParamsDtoType = z.infer<typeof EditCourseParamsDto>
