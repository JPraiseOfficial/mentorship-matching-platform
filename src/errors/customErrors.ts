export class ResourceExistsError extends Error { 
    statusCode: number;  
  
    constructor(message: string) {
    super(message);
    this.statusCode = 409;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}