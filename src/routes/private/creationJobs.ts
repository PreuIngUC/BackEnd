import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/creationJobs.js'
import { AccountsCreationStepParamsDto } from '../../schemas/users/applications.js'
import authorize from '../../middlewares/authorize.js'
import Permissions from '../../constants/permissions.js'

const jobsRouter = new DocumentedRouter('/api/private')

jobsRouter.post(
  '/job/students/create',
  {},
  controller.startStudentsCreation,
  {},
  authorize(Permissions.CreateStudentUsers),
)

jobsRouter.post(
  '/job/staff/create',
  {},
  controller.startStaffCreation,
  {},
  authorize(Permissions.CreateStaffUsers),
)

jobsRouter.post(
  '/job/students/step/:jobId',
  {
    params: AccountsCreationStepParamsDto,
  },
  controller.studentsCreationStep,
  {},
  authorize(Permissions.CreateStudentUsers),
)

jobsRouter.post(
  '/job/staff/step/:jobId',
  {
    params: AccountsCreationStepParamsDto,
  },
  controller.staffCreationStep,
  {},
  authorize(Permissions.CreateStaffUsers),
)

jobsRouter.get(
  '/job/status/:jobId',
  {
    params: AccountsCreationStepParamsDto,
  },
  controller.readJobStatus,
  {},
  authorize(Permissions.ReadJobsStatus),
)

export default jobsRouter
