import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import env from './config/env.js'
import globalErrorHandler from './middlewares/globalErrorHandler.js'

const app: Koa = new Koa()

app.use(globalErrorHandler)

if (env.ITS_PROD) {
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

//TODO: poner auth middleware

//TODO: poner routes

export default app
