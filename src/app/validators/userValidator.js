const { checkSchema } = require('express-validator');
const checkValidation = require('../middlewares/checkValidation');

module.exports = checkSchema({
  name: {
    isString: true,
    notEmpty: true,
    isLength: { options: { max: 60 } }
  },
  email: {
    isEmail: true,
    normalizeEmail: true,
    notEmpty: true
  },
  password: {
    isString: true,
    isLength: { options: { min: 6 } }
  }
});
