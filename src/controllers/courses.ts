import type {
  BodyAndParamsContext,
  BodyContext,
  ParamsContext,
  VoidContext,
} from '../types/context.js'
import type {
  CreateCourseDtoType,
  CreateCourseEnrolmentDtoType,
  EditCourseBodyDtoType,
  EditCourseParamsDtoType,
  GetCourseParamsDtoType,
} from '../schemas/courses/input.js'
import type {
  CreateCourseEnrolmentResponseDtoType,
  CreateCourseResponseDtoType,
  EditCourseResponseDtoType,
  GetCourseResponseDtoType,
  GetCoursesResponseDtoType,
} from '../schemas/courses/output.js'

import DbApi from '../services/dbApi.js'

const courseService = DbApi.getInstance().course()
const courseEnrolmentService = DbApi.getInstance().courseEnrolment()

export async function createCourse(
  ctx: BodyContext<CreateCourseDtoType>,
): Promise<CreateCourseResponseDtoType> {
  const data = ctx.request.body
  const created = await courseService.create({ data })
  return created
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

export async function getCourses(_ctx: VoidContext): Promise<GetCoursesResponseDtoType> {
  const courses = await courseService.findMany({
    select: {
      id: true,
      name: true,
      startDate: true,
      endDate: true,
    },
  })
  return { courses }
}

export async function createCourseEnrolment(
  ctx: BodyContext<CreateCourseEnrolmentDtoType>,
): Promise<CreateCourseEnrolmentResponseDtoType> {
  const data = ctx.request.body
  const created = await courseEnrolmentService.create({
    data,
  })
  return created
}

export async function editCourse(
  ctx: BodyAndParamsContext<EditCourseBodyDtoType, EditCourseParamsDtoType>,
): Promise<EditCourseResponseDtoType> {
  const id = ctx.params.id
  const data = ctx.request.body
  const edited = await courseService.update({
    where: {
      id,
    },
    data,
  })
  return edited
}
