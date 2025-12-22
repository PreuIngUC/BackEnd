import Router from '@koa/router'
import { Context } from 'koa'
// import Permissions from '../constants/permissions.js'
// import { UnauthorizedError } from '../utils/errors/auth0.js'
import env from '../../config/env.js'

const healthRouter = new Router()
healthRouter.get('/health', async (ctx: Context) => {
  const environment = env.ITS_PREV ? 'PREVIEW' : env.ITS_PROD ? 'PRODUCTION' : 'DEVELOPMENT'
  console.dir(ctx.state.user, { depth: null })
  ctx.body = {
    message: `El server funciona y está escuchando requests. El environment es ${environment}.`,
  }
})

export default healthRouter
