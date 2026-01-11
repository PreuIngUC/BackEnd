import AppError from './abstract.js'

export class ApplicationError extends AppError {
  constructor(userType: 'staff' | 'student', errorType: 'existance' | 'status') {
    let message = 'El '
    message += userType === 'staff' ? 'postulante ' : 'estudiante '
    message += errorType === 'existance' ? 'buscado no existe' : 'no espera por aceptación'
    super(message, errorType === 'status' ? 409 : 404)
  }
}
