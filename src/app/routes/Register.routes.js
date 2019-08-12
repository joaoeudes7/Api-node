import fastifyPlugin from 'fastify-plugin';

import User from '../models/User.model';

export default fastifyPlugin(async (app, opts, next) => {
  app.post('/register', async (req, res) => {
    let { username, email } = req.body;

    try {
      if (await User.findOne({ $or: [{ username }, { email }] })) {
        let _msg = 'User already exist.';

        if ([username, email].some(attr => attr == null)) {
          _msg = 'Username or email not exist.';
        }
        return res.status(400).send({ error: _msg });
      }

      const user = await User.create(req.body);

      // Hidden password
      user.password = undefined;
      const token = app.jwt.sign({ id: user.id }, {
        expiresIn: 86400
      })

      res.send({ user, token });

    } catch (error) {
      next(`Error: ${error}`);
    }
  })

  next();
})

