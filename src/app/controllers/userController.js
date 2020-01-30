const { User } = require('../models');
const { validationResult } = require('express-validator');

class UserController {
  async create(request, response) {
    try {
      const user = User.create(request.body);
      return response.status(201).json({});
    } catch (error) {
      return response.status(422).json({ ...error });
    }
  }
}

module.exports = new UserController();
