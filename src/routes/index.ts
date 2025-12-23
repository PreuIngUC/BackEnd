import Router from '@koa/router'
import publicRouter from './public/index.js'
import privateRouter from './private/index.js'

const router = new Router({prefix: '/api'})

router.use(publicRouter.routes(), publicRouter.allowedMethods())
router.use(privateRouter.routes(), privateRouter.allowedMethods())

export default router
