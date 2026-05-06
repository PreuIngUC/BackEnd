import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/users.js'
import {
  StaffApplicationDto,
  StudentApplicationDto,
  VerifyThenPasswordBodyDto,
} from '../../schemas/users/input/applications.js'
import { StudentAbleToApplyResDto } from '../../schemas/users/output/applications.js'

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

usersRouter.get(
  '/student/able-to-apply',
  {},
  controller.studentAbleToApply,
  {
    status: 200,
    schema: StudentAbleToApplyResDto,
  },
  {
    summary: 'Check if the user is able to apply',
  },
)

export default usersRouter
