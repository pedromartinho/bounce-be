import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/baseError';

export default class ErrorHandlerMiddleware {
  /**
   * Error handler to return unexpected errors in a consistent format
   * @returns A middleware function to handle unexpected errors
   */
  // eslint-disable-next-line
  public static handleErrors(err, req: Request, res: Response, _: NextFunction): Response {
    if (err instanceof BaseError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }

  /**
   * Route not found handler to return a 404 error response
   * @returns A middleware function to handle route not found requests
   */
  // eslint-disable-next-line
  public static routeNotFound(req: Request, res: Response, next: NextFunction): Response {
    return res.status(404).json({message: 'Endpoint not found'});
  }
}
