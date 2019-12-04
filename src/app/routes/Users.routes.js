import fastifyPlugin from 'fastify-plugin';

import User from '../models/User.model';

export default fastifyPlugin((app, opts, next) => {
  app.get('/users', async (req, res) => {
    await req.jwtVerify();

    User.find({})
      .then(users => res.send(users));
  });

  app.get('/users/:id', async (req, res) => {
    await req.jwtVerify();

    const { _id } = req.params;

    User.find({ _id })
      .then(result => res.send(result));
  });

  app.put('/users/:id', async (req, res) => {
    await req.jwtVerify();

    const { _id } = req.params;
    const $set = req.body;

    User.update({ _id }, { $set })
      .then(result => res.send(result));
  });

  app.delete('/users/:id', async (req, res) => {
    await req.jwtVerify();

    const { _id } = req.params;

    User.remove({ _id })
      .then(result => res.send(result));
  });

  next();
});
