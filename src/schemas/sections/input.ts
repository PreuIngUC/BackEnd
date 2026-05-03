import { z } from 'zod'
import { SectionSchema, SectionEnrolmentSchema } from '../../generated/zod/index.js'

export const CreateSectionDto = SectionSchema.omit({
  id: true,
  createdAt: true,
})

export const GetSectionParamsDto = z.object({
  id: SectionSchema.shape.id,
})

export const EditSectionParamsDto = SectionSchema.pick({
  id: true,
})

export const EditSectionBodyDto = SectionSchema.omit({
  id: true,
  createdAt: true,
})

export const CreateSectionEnrolmentDto = SectionEnrolmentSchema.omit({
  id: true,
  createdAt: true,
})

// export const GetSectionEnrolmentsQueryDto = SectionEnrolmentSchema.partial()

export type CreateSectionDtoType = z.infer<typeof CreateSectionDto>
export type GetSectionParamsDtoType = z.infer<typeof GetSectionParamsDto>
export type CreateSectionEnrolmentDtoType = z.infer<typeof CreateSectionEnrolmentDto>
export type EditSectionParamsDtoType = z.infer<typeof EditSectionParamsDto>
export type EditSectionBodyDtoType = z.infer<typeof EditSectionBodyDto>
