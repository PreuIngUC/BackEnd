import { Context, Next } from 'koa'

const globalErrorHandler = async (ctx: Context, next: Next) => {
  try {
    await next()
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = {
        error: 'Not Found',
      }
    }
  } catch (err) {
    let errorMessage = 'Internal Server Error'
    let errorStatus = 500
    if (err instanceof Error) {
      errorMessage = err.message
    }
    if (err && typeof err === 'object' && 'status' in err && typeof err.status === 'number') {
      errorStatus = err.status
    }
    ctx.status = errorStatus
    ctx.body = { error: errorMessage }
    ctx.app.emit('error', err, ctx)
  }
}

export default globalErrorHandler
