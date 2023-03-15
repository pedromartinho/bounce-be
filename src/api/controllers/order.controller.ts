import { Request, Response, Router } from 'express';

import {orderSchema} from '../schemas/orders.schema';
import asyncMiddleware from '../middlewares/async.middleware';
import {ValidatorMiddleware} from '../middlewares/validator.middleware';
import PaymentService from '../services/payment.service';
import BaseError from '../errors/baseError';
import { faker } from '@faker-js/faker';

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
      ValidatorMiddleware.properties(orderSchema),
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
    const {cardNumber, amount} = req.body;
    let paymentId;

    try {
      const paymentService = new PaymentService(cardNumber);
      paymentId = await paymentService.performPayment(amount);
    } catch (error) {
      throw (new BaseError(error.message, 400));
    }
    const data: IOrder = {
      id: faker.datatype.uuid(),
      paymentId,
    };

    return res.json(data).status(201);
  }
}
