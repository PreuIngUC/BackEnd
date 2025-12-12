import Router from '@koa/router'
import Permissions from '../constants/permissions.js'
import { UnauthorizedError } from '../utils/errors/auth0.js'

const healthRouter = new Router()
healthRouter.get('/health', async ctx => {
  if (!ctx?.state?.user?.permissions.includes(Permissions.ReadServerHealth)) {
    throw new UnauthorizedError()
  }
  console.dir(ctx.state.user, { depth: null })
  ctx.body = {
    message: 'El server funciona y está escuchando requests.',
  }
})

export default healthRouter
