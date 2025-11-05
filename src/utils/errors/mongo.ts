import AppError from './abstract.js'

export class NoDBError extends AppError {
  constructor(message: string = 'La Base de Datos todavía no ha sido conectada') {
    super(message, 500)
  }
}
