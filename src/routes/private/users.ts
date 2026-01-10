import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/users.js'
import authorize from '../../middlewares/authorize.js'
import Permissions from '../../constants/permissions.js'
import {
  GetApplicationParamsDto,
  StaffApplicationStateChangeParamsDto,
  StudentApplicationStateChangeParamsDto,
} from '../../schemas/users/applications.js'
import {
  GetStudentApplicationsResDto,
  GetStaffApplicationsResDto,
  GetStudentApplicationResDto,
  GetStaffApplicationResDto,
  GetAcceptedUsersResDto,
} from '../../schemas/users/output/applications.js'

const usersRouter = new DocumentedRouter('/api/private')

usersRouter.get(
  '/students/applications',
  {},
  controller.getStudentApplications,
  {
    status: 200,
    schema: GetStudentApplicationsResDto,
  },
  {},
  authorize(Permissions.ReadStudentApplications),
)

usersRouter.get(
  '/staff/applications',
  {},
  controller.getStaffApplications,
  {
    status: 200,
    schema: GetStaffApplicationsResDto,
  },
  {},
  authorize(Permissions.ReadStaffApplications),
)

usersRouter.get(
  '/student/application/:id',
  {
    params: GetApplicationParamsDto,
  },
  controller.getStudentApplication,
  {
    status: 200,
    schema: GetStudentApplicationResDto,
  },
  {},
  authorize(Permissions.ReadStudentApplications),
)

usersRouter.get(
  '/staff/application/:id',
  {
    params: GetApplicationParamsDto,
  },
  controller.getStaffApplication,
  {
    status: 200,
    schema: GetStaffApplicationResDto,
  },
  {},
  authorize(Permissions.ReadStaffApplications),
)

usersRouter.patch(
  '/student/appstate/:applicationState/:id',
  {
    params: StudentApplicationStateChangeParamsDto,
  },
  controller.changeStudentApplicationState,
  undefined,
  undefined,
  authorize(Permissions.AcceptStudentApplications),
)

usersRouter.patch(
  '/staff/appstate/:applicationState/:id',
  {
    params: StaffApplicationStateChangeParamsDto,
  },
  controller.changeStaffApplicationState,
  undefined,
  undefined,
  authorize(Permissions.AcceptStaffApplications),
)

usersRouter.get(
  '/students/accepted',
  {},
  controller.getAcceptedStudents,
  {
    status: 200,
    schema: GetAcceptedUsersResDto,
  },
  undefined,
  authorize(Permissions.ReadAcceptedStudents),
)

usersRouter.get(
  '/staff/accepted',
  {},
  controller.getAcceptedStaff,
  {
    status: 200,
    schema: GetAcceptedUsersResDto,
  },
  undefined,
  authorize(Permissions.ReadAcceptedStaff),
)

export default usersRouter
