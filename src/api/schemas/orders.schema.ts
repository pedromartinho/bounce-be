import Joi from 'joi';

export const orderSchema = Joi.object({
  numberOfBags: Joi.number().required(),
  unitPrice: Joi.number().required(),
  creditCardNumber: Joi.string().min(16).max(19).required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});
