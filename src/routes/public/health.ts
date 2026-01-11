// import Permissions from '../constants/permissions.js'
// import { UnauthorizedError } from '../utils/errors/auth0.js'
import z from 'zod'
import env from '../../config/env.js'
import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'

const healthRouter = new DocumentedRouter('/api/public')

healthRouter.get(
  '/health',
  {},
  async ctx => {
    const environment = env.ITS_PREV ? 'PREVIEW' : env.ITS_PROD ? 'PRODUCTION' : 'DEVELOPMENT'
    console.dir(ctx.state.user, { depth: null })
    return {
      message: `El server funciona y está escuchando requests. El environment es ${environment}.`,
    }
  },
  {
    status: 200,
    schema: z.object({
      message: z.string(),
    }),
  },
)

export default healthRouter
