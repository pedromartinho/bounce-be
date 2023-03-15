import { Request, Response, NextFunction } from 'express';

export class HandleErrorsMiddleware {
  /**
   * Error handler to return unexpected errors in a consistent format
   *
   * @returns A middleware function to handle unexpected errors
   */
  // eslint-disable-next-line
  public static unhandledErrors(err, req: Request, res: Response, _: NextFunction): Response {
    return res.status(500).json({ errors: [err.message] });
  }

  /**
   * Route not found handler to return a 404 error response
   *
   * @returns A middleware function to handle route not found requests
   */
  // eslint-disable-next-line
  public static routeNotFound(req: Request, res: Response, next: NextFunction): Response {
    return res.status(404).json({message: 'Endpoint not found'});
  }
}
