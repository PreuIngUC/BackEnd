import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/users.js'
import authorize from '../../middlewares/authorize.js'
import Permissions from '../../constants/permissions.js'
import {
  GetApplicationParamsDto,
  StaffApplicationStateChangeParamsDto,
  StudentApplicationStateChangeParamsDto,
} from '../../schemas/users/applications.js'

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

usersRouter.get(
  '/student/application/:id',
  {
    params: GetApplicationParamsDto,
  },
  controller.getStudentApplication,
  {},
  authorize(Permissions.ReadStudentApplications),
)

usersRouter.get(
  '/staff/application/:id',
  {
    params: GetApplicationParamsDto,
  },
  controller.getStaffApplication,
  {},
  authorize(Permissions.ReadStaffApplications),
)

usersRouter.patch(
  '/student/appstate/:applicationState/:id',
  {
    params: StudentApplicationStateChangeParamsDto,
  },
  controller.changeStudentApplicationState,
  {},
  authorize(Permissions.AcceptStudentApplications),
)

usersRouter.patch(
  '/staff/appstate/:applicationState/:id',
  {
    params: StaffApplicationStateChangeParamsDto,
  },
  controller.changeStaffApplicationState,
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
