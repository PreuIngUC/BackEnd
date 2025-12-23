import Router from '@koa/router'
import * as controller from '../../controllers/users.js'
import validateThenHandle from '../../middlewares/validateThenHandle.js'
import { StaffApplicationDto, StudentApplicationDto } from '../../schemas/users/applications.js'

const usersRouter = new Router()

usersRouter.post('/staff/application',
    validateThenHandle({ body: StaffApplicationDto }, controller.createStaffApplication))
usersRouter.post('/student/application',
    validateThenHandle({ body: StudentApplicationDto }, controller.createStudentApplication)
)

export default usersRouter