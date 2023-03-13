
import { Request, Response, Router } from 'express';

import asyncMiddleware from '../middlewares/async.middleware';
import PaymentService from '../services/payment.service';
import { randomUUID } from 'crypto';

interface IOrder {
  id: string,
  paymentId: string,
}

/**
 * OrderController class responsible for handling requests related to orders.
 */
export default class OrderController {
  public static router = Router({ mergeParams: true });

  /**
   * Register the routes for the OrderController
   * @returns Router - Returns the router instance for the OrderController
   */
  public static register(): Router {
    this.router.post('/',
      // TODO: middleware for schema validation
      asyncMiddleware(this.create.bind(this))
    );

    return this.router;
  }

  /**
   * @route POST /orders
   * @summary Method to create an order.
   * @returns {Response} returns an the created order object.
   */
  private static async create(req: Request, res: Response): Promise<Response> {
    // TODO: Consider all the sent fields
    const {cardNumber, amount} = req.body;

    const paymentService = new PaymentService(cardNumber)
    // TODO: Error handling
    const paymentId = await paymentService.performPayment(amount)

    // TODO: Should create order object on the BE side
    const data = {
      id: randomUUID(),
      paymentId,
    };

    return res.json(data).status(201);
  }
}
