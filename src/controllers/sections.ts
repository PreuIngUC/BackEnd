import type {
  CreateSectionDtoType,
  CreateSectionEnrolmentDtoType,
  EditSectionBodyDtoType,
  EditSectionParamsDtoType,
  GetSectionParamsDtoType,
} from '../schemas/sections/input.js'
import type {
  CreateSectionEnrolmentResponseDtoType,
  CreateSectionResponseDtoType,
  EditSectionResponseDtoType,
  GetSectionResponseDtoType,
  GetSectionsResponseDtoType,
} from '../schemas/sections/output.js'
import DbApi from '../services/dbApi.js'
import type {
  BodyAndParamsContext,
  BodyContext,
  ParamsContext,
  VoidContext,
} from '../types/context.js'

const sectionService = DbApi.getInstance().section()
const sectionEnrolmentService = DbApi.getInstance().sectionEnrolment()

export async function createSection(
  ctx: BodyContext<CreateSectionDtoType>,
): Promise<CreateSectionResponseDtoType> {
  const data = ctx.request.body
  const created = await sectionService.create({
    data,
  })
  return created
}

//TODO: Crear errores específicos

export async function getSection(
  ctx: ParamsContext<GetSectionParamsDtoType>,
): Promise<GetSectionResponseDtoType> {
  const id = ctx.params.id
  const section = await sectionService.findUnique({
    where: {
      id,
    },
    include: {
      sectionEnrolments: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              names: true,
              lastName0: true,
              lastName1: true,
            },
          },
        },
      },
      schedules: true,
    },
  })
  if (!section) throw new Error('La sección buscada no existe')
  const { sectionEnrolments, schedules, ...cleanSection } = section
  const members = sectionEnrolments.map(sE => {
    const { role, user } = sE
    return {
      ...user,
      role,
    }
  })
  return {
    ...cleanSection,
    members,
    schedules,
  }
}

export async function getSections(_ctx: VoidContext): Promise<GetSectionsResponseDtoType> {
  const sections = await sectionService.findMany({
    include: {
      course: {
        select: {
          name: true,
        },
      },
    },
  })
  const formattedSections = sections.map(s => {
    const { course, ...section } = s
    return {
      ...section,
      courseName: course.name,
    }
  })
  return { sections: formattedSections }
}

export async function editSection(
  ctx: BodyAndParamsContext<EditSectionBodyDtoType, EditSectionParamsDtoType>,
): Promise<EditSectionResponseDtoType> {
  const id = ctx.params.id
  const data = ctx.request.body
  const edited = await sectionService.update({
    where: {
      id,
    },
    data,
  })
  return edited
}

export async function createSectionEnrolment(
  ctx: BodyContext<CreateSectionEnrolmentDtoType>,
): Promise<CreateSectionEnrolmentResponseDtoType> {
  const data = ctx.request.body
  const created = await sectionEnrolmentService.create({
    data,
  })
  return created
}
