import request from 'supertest';
import express from 'express';
import {ValidationError} from 'joi';

import ErrorHandlerMiddleware from '../../middlewares/error-handler.middleware';
import BaseError from '../../errors/baseError';

describe('handle errors', () => {
  const app = express();

  describe('route-not-found method', () => {
    it('returns 404 status code', async () => {
      app.use(ErrorHandlerMiddleware.routeNotFound);

      const response = await request(app).get('/nonexistent-route');

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('message', 'Endpoint not found');
    });
  });

  describe('handleGenericErrors', () => {
    const baseErrorMessage = 'Something went wrong.';
    const baseErrorStatusCode = 409;
    const validationErrorMessage = 'Unknown error';
    const errorMessage = 'Unknown error';
    app.get('/base-error', () => {
      throw new BaseError(baseErrorMessage, baseErrorStatusCode);
    });
    app.get('/validation-error', () => {
      throw new ValidationError(validationErrorMessage, [], {});
    });
    app.get('/unknown-error', () => {
      throw new Error(errorMessage);
    });
    app.use(ErrorHandlerMiddleware.handleErrors);

    it('handles BaseError and returns the error with the same status code', async () => {
      const response = await request(app).get('/base-error');

      expect(response.status).toEqual(baseErrorStatusCode);
      expect(response.body).toHaveProperty('error', baseErrorMessage);
    });

    it('handles BaseError and returns the error with the same status code', async () => {
      const response = await request(app).get('/validation-error');

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('error', validationErrorMessage);
    });

    it('handles unknown errors and returns a 500 status code and the error message', async () => {
      const response = await request(app).get('/unknown-error');

      expect(response.status).toEqual(500);
      expect(response.body).toHaveProperty('error', errorMessage);
    });
  });

});
