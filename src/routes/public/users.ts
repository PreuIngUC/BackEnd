import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/users.js'
import {
  StaffApplicationDto,
  StudentApplicationDto,
  VerifyThenPasswordBodyDto,
} from '../../schemas/users/applications.js'

const usersRouter = new DocumentedRouter('/api/public')

usersRouter.post(
  '/staff/application',
  { body: StaffApplicationDto },
  controller.createStaffApplication,
  {
    status: 201,
  },
)

usersRouter.post(
  '/student/application',
  { body: StudentApplicationDto },
  controller.createStudentApplication,
  {
    status: 201,
  },
)

usersRouter.patch(
  '/users/verify-then-password',
  { body: VerifyThenPasswordBodyDto },
  controller.verifyThenChangePassword,
)

export default usersRouter
