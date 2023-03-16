import PaymentService from '../../services/payment.service';
import request from '../jest.setup';

describe('OrderController', () => {
  describe('create', () => {
    const validPayload = {
      numberOfBags: 1,
      unitPrice: 5.90,
      creditCardNumber: "4242 4242 4242 4242",
      email: "pedro@bounce.dev",
      name: "Pedro Martinho"
    };

    it('should return a created order object', async () => {

      const paymentId = 'payment-id';

      const performPaymentMock = jest.spyOn(PaymentService.prototype, 'performPayment').mockResolvedValue(paymentId);

      const res = await request.post(`/api/orders`).send(validPayload);
      const resultOrder = res.body;

      expect(performPaymentMock).toBeCalledTimes(1);
      expect(performPaymentMock).toBeCalledWith(validPayload.numberOfBags * validPayload.unitPrice);
      expect(typeof resultOrder.id).toEqual('string');
      expect(resultOrder.paymentId).toEqual(paymentId);
    });

    it('should fail since there are missing fields in the payload', async () => {
      const invalidPayload = {
        numberOfBags: 1,
        unitPrice: 5.90,
        creditCardNumber: "4242 4242 4242 4242",
        name: "Pedro Martinho"
      };
      const paymentId = 'payment-id';
      const performPaymentMock = jest.spyOn(PaymentService.prototype, 'performPayment').mockResolvedValue(paymentId);

      const res = await request.post(`/api/orders`).send(invalidPayload);
      const {body: errorBody, status} = res;

      expect(performPaymentMock).toBeCalledTimes(0);
      expect(errorBody).toHaveProperty('error');
      expect(status).toEqual(400);
    });

    it('should fail if payment service gives an error', async () => {
      const errorMessage = 'An error';
      const performPaymentMock = jest.spyOn(PaymentService.prototype, 'performPayment').mockRejectedValue(new Error(errorMessage));

      const res = await request.post(`/api/orders`).send(validPayload);
      const {body: errorBody, status} = res;

      expect(performPaymentMock).toBeCalledTimes(1);
      expect(performPaymentMock).toBeCalledWith(validPayload.numberOfBags * validPayload.unitPrice);
      expect(errorBody).toHaveProperty('error', errorMessage);
      expect(status).toEqual(400);
    });
  });
});