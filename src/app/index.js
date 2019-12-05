import dotenv from 'dotenv';

import fastify from 'fastify';
import rateLimit from 'fastify-rate-limit';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import jwt from 'fastify-jwt';
import sensible from 'fastify-sensible';

import Register from './routes/Register.routes';
import Users from './routes/Users.routes';
import Auth from './routes/Auth.routes';

class App {
  constructor() {
    // load env configs
    dotenv.config();

    this.serve = fastify({ logger: false });

    this.initMiddlewares();
    this.initRouters();

    return this.serve;
  }

  initMiddlewares() {
    this.serve.register(helmet);
    this.serve.register(cors);

    this.serve.register(sensible);

    this.serve.register(jwt, {
      secret: process.env.SECRET_KEY
    });

    this.serve.register(rateLimit, {
      max: 100,
      timeWindow: '1 minute'
    });
  }

  initRouters() {
    this.serve.get('/', async (req, res) => {
      res.send(`The API-REST is Online`);
    });

    // Modules routers
    this.serve
      .register(Auth)
      .register(Register)
      .register(Users);
  }
}

export default new App();
