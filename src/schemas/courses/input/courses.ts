import { z } from 'zod'
import { CourseSchema, CourseEnrolmentSchema, SectionSchema, SectionEnrolmentSchema } from '../../../generated/zod/index.js'

export const CreateCourseDto = CourseSchema.omit({
    id: true,
    createdAt: true
})

export const CreateCourseEnrolmentDto = CourseEnrolmentSchema.omit({
    id: true,
    createdAt: true
})

export const CreateSectionDto = SectionSchema.omit({
    id: true,
    createdAt: true
})

export const CreateSectionEnrolmentDto = SectionEnrolmentSchema.omit({
    id: true,
    createdAt: true
})

export type CreateCourseDtoType = z.infer<typeof CreateCourseDto>
export type CreateCourseEnrolmentDtoType = z.infer<typeof CreateCourseEnrolmentDto>
export type CreateSectionDtoType = z.infer<typeof CreateSectionDto>
export type CreateSectionEnrolmentDtoType = z.infer<typeof CreateSectionEnrolmentDto>


