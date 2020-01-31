const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (request, response, next) => {
  const {
    headers: { authorization }
  } = request;

  if (!authorization) {
    return response.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    request.userId = decoded.id;

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token invalid' });
  }
};
