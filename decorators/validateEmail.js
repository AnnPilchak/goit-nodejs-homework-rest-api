import { HttpError } from '../helpers/index.js';

const validateEmail = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, 'Verify token is required'));
    }
    next();
  };

  return func;
};

export default validateEmail;