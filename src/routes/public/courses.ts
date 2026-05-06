import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/courses.js'
import { GetCoursesAvailableForApplicationsResponseDto } from '../../schemas/courses/output.js'

const coursesRouter = new DocumentedRouter('/api/public')

coursesRouter.get(
  '/courses/applications_available',
  {},
  controller.getCoursesAvailableForApplications,
  {
    status: 200,
    schema: GetCoursesAvailableForApplicationsResponseDto,
  },
  {
    summary: 'Returns an array of all the courses available for applications',
  },
)

export default coursesRouter
