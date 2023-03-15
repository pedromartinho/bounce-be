import PaymentService from "../../services/payment.service";

describe('test Payment Service', () => {
  describe('performPayment method', () => {
    const payment = {
      id: 'an-id',
      amount: 10,
      creditCardNumber: '4242 4242 4242 4242'
    };

    it('should perform payment with success', async () => {
      jest.spyOn(PaymentService.prototype as any, 'paymentRequest').mockReturnValueOnce(payment);
      const paymentService = new PaymentService('1234567890123456');

      const paymentId = await paymentService.performPayment(100);

      expect(paymentId).toEqual(payment.id);
    });

    it('should throw an error when payment fails', async () => {
      jest.spyOn(PaymentService.prototype as any, 'paymentRequest').mockRejectedValueOnce(new Error());
      const paymentService = new PaymentService('1234567890123456');

      await expect(paymentService.performPayment(1000)).rejects.toThrow('Could not perform payment');

      expect(paymentId).toEqual(payment.id);
    });
  });
});