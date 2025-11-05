class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    //Esto mantiene el seguimiento del error, no entiendo bien cómo funciona
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default AppError
