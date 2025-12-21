import Router from '@koa/router'
import * as controller from '../controllers/users.js'

const usersRouter = new Router()

usersRouter.post('/staff/application', controller.createStaffApplication)
usersRouter.post('/student/application')