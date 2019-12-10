import fastifyPlugin from 'fastify-plugin';
import bcrypt from 'bcryptjs';

import User from '../models/User.model';

export default fastifyPlugin((app, opts, next) => {
  /**
   * AUTH
   */
  app.post('/auth', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+password');

    try {
      if (!user) {
        throw 'User not found';
      }

      if (!await bcrypt.compare(password, user.password)) {
        throw 'Invalid password';
      }

      const token = app.jwt.sign({ id: user.id }, {
        expiresIn: 86400
      });

      res.send({ user, token });
    } catch (error) {
      res.badRequest(error);
    }
  });

  next();
});
