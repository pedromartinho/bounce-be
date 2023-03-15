import { faker } from '@faker-js/faker';
import { Request, Response, Router } from 'express';

import asyncMiddleware from '../middlewares/async.middleware';

/**
 * StoreController class responsible for handling requests related to Stores.
 */
export default class StoreController {
  public static router = Router({ mergeParams: true });

  /**
   * Register the routes for the StoreController
   * @returns Router - Returns the router instance for the StoreController
   */
  public static register(): Router {
    this.router.get('/:storeId',
      asyncMiddleware(this.show.bind(this))
    );

    return this.router;
  }

  /**
   * @route GET /stores/:storeId
   * @summary Method to get Store details.
   * @returns {Response} returns the Store object.
   */
  private static async show(req: Request, res: Response): Promise<Response> {
    const {storeId} = req.params;

    return res.json({
      id: storeId,
      name: faker.company.name(),
      unitPrice: faker.datatype.number({ min: 5, max: 10, precision: 0.01 }),
    });
  }
}
