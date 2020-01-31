const { checkSchema } = require('express-validator');

module.exports = checkSchema({
  email: {
    isEmail: true,
    notEmpty: true,
    normalizeEmail: true
  },
  password: {
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 6 }
    }
  }
});
