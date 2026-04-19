import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/courses.js'
import { CreateCourseDto, GetCourseParamsDto } from '../../schemas/courses/input.js'
import { CreateCourseResponseDto, GetCourseResponseDto } from '../../schemas/courses/output.js'

const coursesRouter = new DocumentedRouter('/api/private')

coursesRouter.post(
  '/course',
  {
    body: CreateCourseDto,
  },
  controller.createCourse,
  {
    status: 201,
    schema: CreateCourseResponseDto,
  },
  {
    summary: 'Creates a new course, the response contains the id and createdAt attributes.',
  },
)

coursesRouter.get(
  '/course/:id',
  {
    params: GetCourseParamsDto,
  },
  controller.getCourse,
  {
    status: 200,
    schema: GetCourseResponseDto,
  },
  {
    summary:
      'Returns all course information, including coordinators, teachers and sections (id and name)',
  },
)

//TODO: get courses (id y nombre)

export default coursesRouter
