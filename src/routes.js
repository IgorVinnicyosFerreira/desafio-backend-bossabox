const routes = require('express').Router();
const CheckValidation = require('./app/middlewares/checkValidation');
const ErrorHandler = require('./app/middlewares/errorHandler');
const Authentication = require('./app/middlewares/authentication');
const UserController = require('./app/controllers/userController');
const UserValidator = require('./app/validators/userValidator');
const SessionController = require('./app/controllers/sessionController');
const SessionValidator = require('./app/validators/sessionValidator');

routes.route('/users').post(UserValidator, CheckValidation, UserController.create);
routes.post('/sessions', SessionValidator, CheckValidation, SessionController.create);

routes.use(Authentication);

routes.route('/tools').get((req, res) => {
  return res.json({});
});

routes.use(ErrorHandler);

routes.get('/', function(req, res) {
  res.send('Hello world');
});

module.exports = routes;
