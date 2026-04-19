import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import {
  CreateSectionDto,
  CreateSectionEnrolmentDto,
  EditSectionBodyDto,
  EditSectionParamsDto,
  GetSectionParamsDto,
} from '../../schemas/sections/input.js'
import * as controller from '../../controllers/sections.js'
import {
  CreateSectionEnrolmentResponseDto,
  CreateSectionResponseDto,
  EditSectionResponseDto,
  GetSectionResponseDto,
  GetSectionsResponseDto,
} from '../../schemas/sections/output.js'
import authorize from '../../middlewares/authorize.js'
import Permissions from '../../constants/permissions.js'

const sectionsRouter = new DocumentedRouter('/api/private')

sectionsRouter.post(
  '/section',
  {
    body: CreateSectionDto,
  },
  controller.createSection,
  {
    status: 201,
    schema: CreateSectionResponseDto,
  },
  {
    summary: 'Creates a Section and returns its values',
  },
  authorize(Permissions.CreateSections),
)

sectionsRouter.get(
  '/section/:id',
  {
    params: GetSectionParamsDto,
  },
  controller.getSection,
  {
    status: 200,
    schema: GetSectionResponseDto,
  },
  {
    summary: 'Returns the data of a specific section',
  },
  authorize(Permissions.ReadSections),
)

sectionsRouter.get(
  '/sections',
  {},
  controller.getSections,
  {
    status: 200,
    schema: GetSectionsResponseDto,
  },
  {
    summary: 'Returns all the existing sections',
  },
  authorize(Permissions.ReadSections),
)

sectionsRouter.patch(
  '/section/:id',
  {
    params: EditSectionParamsDto,
    body: EditSectionBodyDto,
  },
  controller.editSection,
  {
    status: 200,
    schema: EditSectionResponseDto,
  },
  {
    summary: 'Edits the basic info of a section',
  },
  authorize(Permissions.EditSections),
)

sectionsRouter.post(
  '/section_enrolment',
  {
    body: CreateSectionEnrolmentDto,
  },
  controller.createSectionEnrolment,
  {
    status: 201,
    schema: CreateSectionEnrolmentResponseDto,
  },
  {
    summary: 'Creates a section enrolment and returns it',
  },
  authorize(Permissions.CreateSectionEnrolments),
)

export default sectionsRouter
