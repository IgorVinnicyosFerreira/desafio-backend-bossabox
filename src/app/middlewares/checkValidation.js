const { validationResult } = require('express-validator');

const errorFormatter = ({ param, value, msg }) => ({
  field: param,
  message: msg,
  value
});

module.exports = (request, response, next) => {
  const result = validationResult(request).formatWith(errorFormatter);

  if (!result.isEmpty()) {
    const errors = {
      validationError: true,
      errors: result.array()
    };
    next(errors);
  }

  next();
};
