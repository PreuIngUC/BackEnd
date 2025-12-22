import Router from '@koa/router'
import publicRouter from './public'
import privateRouter from './private'

const router = new Router({prefix: '/api'})

router.use(publicRouter.routes(), publicRouter.allowedMethods())
router.use(privateRouter.routes(), privateRouter.allowedMethods())

export default router
