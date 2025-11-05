import AppError from './abstract.js'

export class NoResOnTokenError extends AppError {
  constructor(message: string = 'No hubo respuesta al obtener el token de Auth0') {
    super(message, 503)
  }
}
