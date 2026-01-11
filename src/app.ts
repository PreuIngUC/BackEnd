import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import env from './config/env.js'
import globalErrorHandler from './middlewares/globalErrorHandler.js'
import router from './routes/index.js'

const app: Koa = new Koa()

app.use(async (ctx, next) => {
  console.log('[REQ]', ctx.method, ctx.path)
  await next()
  console.log('[RES]', ctx.method, ctx.path, ctx.status)
})

const allowedOrigins: (string | RegExp)[] = [
  env.FRONTEND_URL, // prod fijo si lo tienes
  /^https:\/\/preuinguc-git-.*\.vercel\.app$/, // previews
]

if (env.ITS_PROD || env.ITS_PREV) {
  console.log('CORS en PROD o PREV')
  app.use(
    cors({
      origin: ctx => {
        const origin = ctx.get('Origin')
        if (!origin) return '' // requests sin Origin (curl/postman)
        const ok = allowedOrigins.some(o => (typeof o === 'string' ? o === origin : o.test(origin)))
        return ok ? origin : '' // refleja el origin permitido
      },
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
    }),
  )
} else {
  app.use(cors())
}

app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.status = 204
    return
  }
  await next()
})

app.use(globalErrorHandler)

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

export default app
