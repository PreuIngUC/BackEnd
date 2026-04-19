import { z } from 'zod'
import { CourseEnrolmentSchema, CourseSchema, SectionSchema, UserSchema } from '../../generated/zod/index.js'

export const CreateCourseResponseDto = CourseSchema.pick({
    id: true,
    createdAt: true
})

export const GetCourseResponseDto = CourseSchema.extend({
    staff: UserSchema.pick({
        id: true,
        names: true,
        lastName0: true,
        lastName1: true,
    }).extend({
        role: CourseEnrolmentSchema.shape.role
    }).array(),
    sections: SectionSchema.pick({
        id: true,
        name: true
    }).array()
})

export type CreateCourseResponseDtoType = z.infer<typeof CreateCourseResponseDto>
export type GetCourseResponseDtoType = z.infer<typeof GetCourseResponseDto>