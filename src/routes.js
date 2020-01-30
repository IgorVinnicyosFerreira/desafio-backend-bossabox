const routes = require('express').Router();
const UserController = require('./app/controllers/userController');
const UserValidator = require('./app/validators/userValidator');
const checkValidation = require('./app/middlewares/checkValidation');
const errorHandler = require('./app/middlewares/errorHandler');

routes.route('/users').post(UserValidator, checkValidation, UserController.create);
routes.use(errorHandler);

routes.get('/', function(req, res) {
  res.send('Hello world');
});

module.exports = routes;
