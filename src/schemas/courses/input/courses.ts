// import { z } from 'zod'
import { CourseSchema, CourseEnrolmentSchema, SectionSchema, SectionEnrolmentSchema } from '../../../generated/zod/index.js'

export const CourseInput = CourseSchema.omit({
    id: true
})

export const CourseEnrolmentInput = CourseEnrolmentSchema.omit({
    id: true,
})

export const SectionInput = SectionSchema.omit({
    id: true
})

export const SectionEnrolmentInput = SectionEnrolmentSchema.omit({
    id: true
})

