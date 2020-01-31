const { User } = require('../models/index');

class SessionController {
  async create(request, response, next) {
    const {
      body: { email, password }
    } = request;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response.status(401).json({ message: 'User not found' });
      }

      if (!(await user.checkPassword(password))) {
        return response.status(401).json({ message: 'Invalid password ' });
      }

      return response.status(200).json({ user, token: user.generateToken() });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SessionController();
