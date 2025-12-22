import { Context, Next } from 'koa'
import AppError from '../utils/errors/abstract'
import { Prisma } from '@prisma/client'

function handlePrismaError(err: Prisma.PrismaClientKnownRequestError, ctx: Context) {
  let target
  let fields
  switch (err.code) {
    case 'P2002':
      ctx.status = 409
      target = (err.meta?.target as string[]) || []
      fields = target.join(', ')
      ctx.body = {
        type: 'unique_violation',
        message: `El valor ingresado para ${fields ? fields : 'el campo'} ya existe`
      }
      break
    case 'P2003':
      ctx.status = 400
      ctx.body = {
        type: 'foreign_key_error',
        message: 'Se está referenciando un registro que no existe.'
      }
      break
    case 'P2025':
      ctx.status = 404
      ctx.body = {
        type: 'not_found',
        message: 'El registro buscado no existe'
      }
      break
    default:
      ctx.status = 400
      ctx.body = {
        type: 'database_error',
        message: `Error de base de datos: ${err.code}`
      }
  }
}

async function globalErrorHandler(ctx: Context, next: Next) {
  try {
    await next()
    //Aquí se manejan rutas no definidas en que no se agrega body
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = {
        type: 'route_not_found',
        message: `La ruta ${ctx.request.method} ${ctx.request.url} no existe`
      }
      ctx.status = 404
    }
  } catch (err) {
    ctx.app.emit('error', err, ctx)

    // Errores controlados e identificados con AppError
    if (err instanceof AppError) {
      ctx.status = err.statusCode
      ctx.body = {
        type: err.constructor.name,
        message: err.message
      }
      return
    }
    // Errores de Prisma
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err, ctx)
    }
    if (err instanceof Prisma.PrismaClientValidationError) {
      ctx.status = 400
      ctx.body = {
        type: 'database_validation_error',
        message: 'Error de formato en la consulta de la base de datos'
      }
      return
    }
    //Errores desconocidos: identificar y arreglar o abordar
    console.error('ERROR NO CONTROLADO:', err)

    ctx.status = 500
    ctx.body = {
      type: 'internal_server_error',
      message: 'Ocurrió un error inesperado en el servidor'
    }
  }
}

export default globalErrorHandler
