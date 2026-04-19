import type { BodyContext, ParamsContext } from '../types/context.js'
import type { CreateCourseDtoType, GetCourseParamsDtoType } from '../schemas/courses/input.js'
import type {
  CreateCourseResponseDtoType,
  GetCourseResponseDtoType,
} from '../schemas/courses/output.js'

import DbApi from '../services/dbApi.js'

const courseService = DbApi.getInstance().course()

export async function createCourse(
  ctx: BodyContext<CreateCourseDtoType>,
): Promise<CreateCourseResponseDtoType> {
  const data = ctx.request.body
  const { id, createdAt } = await courseService.create({ data })
  return { id, createdAt }
}

export async function getCourse(
  ctx: ParamsContext<GetCourseParamsDtoType>,
): Promise<GetCourseResponseDtoType> {
  const { id } = ctx.params
  const course = await courseService.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      open: true,
      finished: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      courseEnrolments: {
        select: {
          user: {
            select: {
              id: true,
              names: true,
              lastName0: true,
              lastName1: true,
            },
          },
          role: true,
        },
      },
      sections: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  if (!course) throw new Error('El curso buscado no existe.')
  const { courseEnrolments, ...cleanedCourse } = course
  const staff = courseEnrolments.map(cE => {
    const { user, role } = cE
    return {
      ...user,
      role,
    }
  })
  return {
    ...cleanedCourse,
    staff,
  }
}
