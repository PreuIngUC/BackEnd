import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import env from './config/env.js'
import globalErrorHandler from './middlewares/globalErrorHandler.js'
import router from './routes/index.js'

const app: Koa = new Koa()

app.use(async (ctx, next) => {
  console.log("[REQ]", ctx.method, ctx.path);
  await next();
  console.log("[RES]", ctx.method, ctx.path, ctx.status);
})

app.use(globalErrorHandler)

if (env.ITS_PROD || env.ITS_PREV) {
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowHeaders: ['Content-Type', 'Authorization'],
    }),
  )
} else {
  app.use(cors())
}

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

export default app
