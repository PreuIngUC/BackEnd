import Router from '@koa/router'

const healthRouter = new Router()
healthRouter.get('/health', async ctx => {
  ctx.body = {
    message: 'El server funciona y está escuchando',
  }
})

export default healthRouter
