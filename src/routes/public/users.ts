import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/users.js'
import { StaffApplicationDto, StudentApplicationDto } from '../../schemas/users/applications.js'

const usersRouter = new DocumentedRouter('/api')

usersRouter.post(
  '/staff/application',
  { body: StaffApplicationDto },
  controller.createStaffApplication,
)
usersRouter.post(
  '/student/application',
  { body: StudentApplicationDto },
  controller.createStudentApplication,
)

export default usersRouter
