import Router from '@koa/router'
import publicRouter from './public/index.js'
import privateRouter from './private/index.js'

const router = new Router()

router.get("/", (ctx) => {
  ctx.status = 200
  ctx.body = "API running"
})

router.get("/favicon.ico", (ctx) => {
  ctx.status = 204
})

router.use(publicRouter.routes(), publicRouter.allowedMethods())
router.use(privateRouter.routes(), privateRouter.allowedMethods())

export default router
