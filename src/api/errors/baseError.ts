export default class BaseError extends Error {
  public statusCode;
  constructor (message, statusCode) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}
