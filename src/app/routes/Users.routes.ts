import fastifyPlugin from 'fastify-plugin';

import User from '../models/User.model';

export default fastifyPlugin((app, opts, next) => {
  /**
   * GET USERS
   */
  app.get('/users', async (req, res) => {
    await req.jwtVerify();

    User.find({})
      .then(users => res.send(users));
  });

  /**
   * GET USER ID
   */
  app.get('/users/:id', async (req, res) => {
    await req.jwtVerify();

    const { _id } = req.params;

    User.find({ _id })
      .then(result => res.send(result));
  });

  /**
   * PUT USER
   */
  app.put('/users/:id', async (req, res) => {
    await req.jwtVerify();

    const { _id } = req.params;
    const $set = req.body;

    User.update({ _id }, { $set })
      .then(result => res.send(result));
  });

  /**
   * DELETE USER
   */
  app.delete('/users/:id', async (req, res) => {
    await req.jwtVerify();

    const { _id } = req.params;

    User.remove({ _id })
      .then(result => res.send(result));
  });

  next();
});
