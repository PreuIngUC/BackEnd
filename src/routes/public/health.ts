// import Permissions from '../constants/permissions.js'
// import { UnauthorizedError } from '../utils/errors/auth0.js'
import env from '../../config/env.js'
import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'

const healthRouter = new DocumentedRouter('/api')

healthRouter.get('/health', {}, async ctx => {
  const environment = env.ITS_PREV ? 'PREVIEW' : env.ITS_PROD ? 'PRODUCTION' : 'DEVELOPMENT'
  console.dir(ctx.state.user, { depth: null })
  ctx.body = {
    message: `El server funciona y está escuchando requests. El environment es ${environment}.`,
  }
})

export default healthRouter
