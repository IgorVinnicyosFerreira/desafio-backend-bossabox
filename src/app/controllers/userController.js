const { User } = require('../models');
const { validationResult } = require('express-validator');

class UserController {
  async create(request, response, next) {
    try {
      const user = User.create(request.body);
      return response.status(201).json({});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
