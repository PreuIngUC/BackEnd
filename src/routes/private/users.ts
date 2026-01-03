import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/users.js'
import { ApplicationAcceptanceParamsDto } from '../../schemas/users/applications.js'
import authorize from '../../middlewares/authorize.js'
import Permissions from '../../constants/permissions.js'

const usersRouter = new DocumentedRouter('/api/private')

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

usersRouter.post(
  '/students/create',
  {},
  controller.startStudentsCreation,
  {},
  authorize(Permissions.CreateStudentUsers),
)

usersRouter.post(
  '/staff/create',
  {},
  controller.startStaffCreation,
  {},
  authorize(Permissions.CreateStaffUsers),
)

export default usersRouter
