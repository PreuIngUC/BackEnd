import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/users.js'
import { ApplicationAcceptanceParamsDto } from '../../schemas/users/applications.js'
import authorize from '../../middlewares/authorize.js'
import Permissions from '../../constants/permissions.js'

const usersRouter = new DocumentedRouter('/api/private')

usersRouter.get(
  '/students/applications',
  {},
  controller.getStudentApplications,
  {},
  authorize(Permissions.ReadStudentApplications),
)

usersRouter.get(
  '/staff/applications',
  {},
  controller.getStaffApplications,
  {},
  authorize(Permissions.ReadStaffApplications),
)

usersRouter.patch(
  '/student/accept/:id',
  {
    params: ApplicationAcceptanceParamsDto,
  },
  controller.acceptStudent,
  {},
  authorize(Permissions.AcceptStudentApplications),
)

usersRouter.patch(
  '/staff/accept/:id',
  {
    params: ApplicationAcceptanceParamsDto,
  },
  controller.acceptStaff,
  {},
  authorize(Permissions.AcceptStaffApplications),
)

usersRouter.get(
  '/students/accepted',
  {},
  controller.getAcceptedStudents,
  {},
  authorize(Permissions.ReadAcceptedStudents),
)

usersRouter.get(
  '/staff/accepted',
  {},
  controller.getAcceptedStaff,
  {},
  authorize(Permissions.ReadAcceptedStaff),
)

export default usersRouter
