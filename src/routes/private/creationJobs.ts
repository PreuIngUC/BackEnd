import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import * as controller from '../../controllers/creationJobs.js'
import { AccountsCreationStepParamsDto } from '../../schemas/users/applications.js'
import authorize from '../../middlewares/authorize.js'
import Permissions from '../../constants/permissions.js'
import {
  AccountsCreationStepResDto,
  ReadJobsStatusResDto,
  StartAccountsCreationResDto,
} from '../../schemas/users/output/applications.js'

const jobsRouter = new DocumentedRouter('/api/private')

jobsRouter.post(
  '/job/students/create',
  {},
  controller.startStudentsCreation,
  {
    status: 201,
    schema: StartAccountsCreationResDto,
  },
  undefined,
  authorize(Permissions.CreateStudentUsers),
)

jobsRouter.post(
  '/job/staff/create',
  {},
  controller.startStaffCreation,
  {
    status: 201,
    schema: StartAccountsCreationResDto,
  },
  undefined,
  authorize(Permissions.CreateStaffUsers),
)

jobsRouter.post(
  '/job/students/step/:jobId',
  {
    params: AccountsCreationStepParamsDto,
  },
  controller.studentsCreationStep,
  {
    status: 201,
    schema: AccountsCreationStepResDto,
  },
  undefined,
  authorize(Permissions.CreateStudentUsers),
)

jobsRouter.post(
  '/job/staff/step/:jobId',
  {
    params: AccountsCreationStepParamsDto,
  },
  controller.staffCreationStep,
  {
    status: 201,
    schema: AccountsCreationStepResDto,
  },
  undefined,
  authorize(Permissions.CreateStaffUsers),
)

jobsRouter.get(
  '/job/status/:jobId',
  {
    params: AccountsCreationStepParamsDto,
  },
  controller.readJobStatus,
  {
    status: 200,
    schema: ReadJobsStatusResDto,
  },
  undefined,
  authorize(Permissions.ReadJobsStatus),
)

export default jobsRouter
