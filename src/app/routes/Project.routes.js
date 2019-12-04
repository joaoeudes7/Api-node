import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin((app, opts, next) => {
  app.get('/project', async (req, res) => {
    res.send({ user: req.userId });
  });

  next();
});
