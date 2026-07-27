export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401, true)
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, true)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded. Please try again later.') {
    super(message, 429, true)
    Object.setPrototypeOf(this, RateLimitError.prototype)
  }
}