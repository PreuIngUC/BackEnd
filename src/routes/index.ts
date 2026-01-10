import DocumentedRouter from '../infrastructure/openapi/documentedRouter.js'
import publicRouter from './public/index.js'
import privateRouter from './private/index.js'
import { buildOpenApi } from '../infrastructure/openapi/openapi.js'
import z from 'zod'

const router = new DocumentedRouter('')

router.get(
  '/',
  {},
  async _ctx => {
    return 'API Running'
  },
  {
    status: 200,
    schema: z.string(),
  },
)

router.get('/favicon.ico', {}, async _ctx => {})

router.use(publicRouter.routes())
router.use(publicRouter.allowedMethods())
router.use(privateRouter.routes())
router.use(privateRouter.allowedMethods())

router.get(
  '/openapi.json',
  {},
  async _ctx => {
    return buildOpenApi()
  },
  {
    status: 200,
    schema: z.any(),
  },
)

export default router
