import fastifyPlugin from 'fastify-plugin';
import bcrypt from 'bcryptjs';

import User from '../models/User.model';

export default fastifyPlugin((app, opts, next) => {
  app.post('/auth', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Invalid password' });
    }

    // hidden password
    user.password = undefined;
    const token = app.jwt.sign({ id: user.id }, {
      expiresIn: 86400
    });

    return res.send({ user, token });
  });

  next();
});
