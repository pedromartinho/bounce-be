export default class BaseError extends Error {
  public statusCode: number;
  constructor (message: string, statusCode: number) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}
