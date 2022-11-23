import fastifyPlugin from 'fastify-plugin';

import UserController from '../controller/User.controller';

export default fastifyPlugin((app, opts, next) => {
  /**
   * GET USERS
   */
  app.get('/users', async (req, res) => {
    await req.jwtVerify();

    UserController.getAll().then(users => {
      res.send(users);
    });
  });

  /**
   * GET USER ID
   */
  app.get('/users/:id', async (req, res) => {
    await req.jwtVerify();

    const { _id } = req.params;

    UserController.getOne(_id).then(result => {
      res.send(result);
    });
  });

  /**
   * PUT USER
   */
  app.put('/users/:id', async (req, res) => {
    await req.jwtVerify();

    const { _id } = req.params;

    UserController.update(_id, req.body).then(result => {
      res.send(result);
    });
  });

  /**
   * DELETE USER
   */
  app.delete('/users/:id', async (req, res) => {
    await req.jwtVerify();

    const { _id } = req.params;

    UserController.disable(_id).then(result => {
      res.send(result);
    });
  });

  next();
});
