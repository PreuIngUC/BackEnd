import Router from '@koa/router'
import healthRouter from './health.js'
import usersRouter from './users.js'

const publicRouter = new Router()

publicRouter.get("/", (ctx) => {
  ctx.status = 200
  ctx.body = "API running"
})

publicRouter.get("/favicon.ico", (ctx) => {
  ctx.status = 204
})

publicRouter.use(healthRouter.routes(), healthRouter.allowedMethods())
publicRouter.use(usersRouter.routes(), usersRouter.allowedMethods())

export default publicRouter