import { HttpError } from '../helpers/index.js';

const validateFavorite = schema => {
  const func = (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, `missing field favorite`));
    }
    next();
  };
  return func;
};

export default validateFavorite;