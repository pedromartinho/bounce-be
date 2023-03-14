import { randomUUID } from "crypto";

// TODO: Move to own file
interface IPayment {
  id: string;
  amount: number;
  creditCardNumber: string;
}

/**
 * Payment service class responsible for the payment management
 */
export default class PaymentService {
  private cardNumber: string;

  constructor(cardNumber: string) {
    // Consider Card Number as the authentication needed to perform a payment by the user
    this.cardNumber = cardNumber;
  }

  /**
   * Perform a payment of given amount
   * @param {number} amount - payment amount
   * @returns {Promise<string>} - Created payment id
   */
  public async performPayment(amount: number): Promise<string> {
    const payment = await this.paymentRequest(amount);

    return payment.id;
  }

  /**
   * Mock request to create payment using an external entity
   * @returns {Promise<IPayment>} - A promise with returned payment object
   */
  private async paymentRequest(amount: number): Promise<IPayment> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (Math.random() < 0.5) {
      const error = new Error('Could not perform payment'); 
      throw error;
    }
    return {
      id: randomUUID(),
      amount,
      creditCardNumber: this.cardNumber,
    };
  }
}