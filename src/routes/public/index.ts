import Router from '@koa/router'
import healthRouter from './health.js'
import usersRouter from './users.js'

const publicRouter = new Router()

publicRouter.use(healthRouter.routes(), healthRouter.allowedMethods())
publicRouter.use(usersRouter.routes(), usersRouter.allowedMethods())

export default publicRouter