import AppError from './abstract.js'

export class NoResOnTokenError extends AppError {
  constructor(message: string = 'No hubo respuesta al obtener el token de Auth0') {
    super(message, 503)
  }
}
export class UnauthorizedError extends AppError {
  constructor(message: string = 'No está autorizado para realizar esta operación') {
    super(message, 403)
  }
}
export class UnauthenticatedError extends AppError {
  constructor(message: string = 'No se ha logrado autenticar esta petición.') {
    super(message, 401)
  }
}
