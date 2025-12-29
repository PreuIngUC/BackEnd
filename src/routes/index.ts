import DocumentedRouter from '../infrastructure/openapi/documentedRouter.js'
import publicRouter from './public/index.js'
import privateRouter from './private/index.js'
import { buildOpenApi } from '../infrastructure/openapi/openapi.js'

const router = new DocumentedRouter('')

router.get('/', {}, async ctx => {
  ctx.status = 200
  ctx.body = 'API running'
})

router.get('/favicon.ico', {}, async ctx => {
  ctx.status = 204
})

router.use(publicRouter.routes())
router.use(publicRouter.allowedMethods())
router.use(privateRouter.routes())
router.use(privateRouter.allowedMethods())

router.get('/openapi.json', {}, async ctx => {
  ctx.body = buildOpenApi()
})

export default router
