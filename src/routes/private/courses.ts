import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/courses.js'
import {
  CreateCourseDto,
  CreateCourseEnrolmentDto,
  EditCourseBodyDto,
  EditCourseParamsDto,
  GetCourseParamsDto,
} from '../../schemas/courses/input.js'
import {
  CreateCourseEnrolmentResponseDto,
  CreateCourseResponseDto,
  EditCourseResponseDto,
  GetCourseResponseDto,
  GetCoursesResponseDto,
} from '../../schemas/courses/output.js'
import authorize from '../../middlewares/authorize.js'
import Permissions from '../../constants/permissions.js'

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
  authorize(Permissions.CreateCourses),
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
  authorize(Permissions.ReadCourses),
)

coursesRouter.patch(
  '/course/:id',
  {
    params: EditCourseParamsDto,
    body: EditCourseBodyDto,
  },
  controller.editCourse,
  {
    status: 200,
    schema: EditCourseResponseDto,
  },
  {
    summary: 'Edits a course and returns the edited course',
  },
  authorize(Permissions.EditCourses),
)

coursesRouter.get(
  '/courses',
  {},
  controller.getCourses,
  {
    status: 200,
    schema: GetCoursesResponseDto,
  },
  {
    summary: 'Returns an array of all the courses on de DataBase',
  },
  authorize(Permissions.ReadCourses),
)

coursesRouter.post(
  '/course_enrolment',
  {
    body: CreateCourseEnrolmentDto,
  },
  controller.createCourseEnrolment,
  {
    status: 201,
    schema: CreateCourseEnrolmentResponseDto,
  },
  {
    summary: 'Creates an enrolment to a specific course',
  },
  authorize(Permissions.CreateCourseEnrolments),
)

export default coursesRouter
