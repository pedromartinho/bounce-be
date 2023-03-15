import Joi from 'joi';
import ValidatorMiddleware from '../../middlewares/validator.middleware';

describe('test validate method', () => {
  const schema = Joi.object({
    test: Joi.string().required(),
  });

  const res = {} as any;
  const next = jest.fn();

  it('should call validator with the correct schema and validate the request body', async () => {
    const req = { body: {test : '1'}} as any;
    const validateFn = ValidatorMiddleware.properties(schema);

    validateFn(req, res, next);

    expect(next).toHaveBeenNthCalledWith(1);
  });

  it('should call next with the error when validation fails', async () => {
    const req = { body: {b : 1}} as any;
    const validateFn = ValidatorMiddleware.properties(schema);

    validateFn(req, res, next);

    expect(next).toHaveBeenNthCalledWith(1, expect.any(Error));
    expect(next).toHaveBeenNthCalledWith(2);
  });
});
