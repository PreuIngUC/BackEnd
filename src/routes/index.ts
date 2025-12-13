import Router from '@koa/router'
import healthRouter from './health.js'

const router = new Router({prefix: '/api'})

router.use(healthRouter.routes(), healthRouter.allowedMethods())

export default router
