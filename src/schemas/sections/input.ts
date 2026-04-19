import { z } from 'zod'
import { SectionSchema, SectionEnrolmentSchema } from '../../generated/zod/index.js'

export const CreateSectionDto = SectionSchema.omit({
  id: true,
  createdAt: true,
})

export const CreateSectionEnrolmentDto = SectionEnrolmentSchema.omit({
  id: true,
  createdAt: true,
})

export type CreateSectionDtoType = z.infer<typeof CreateSectionDto>
export type CreateSectionEnrolmentDtoType = z.infer<typeof CreateSectionEnrolmentDto>
