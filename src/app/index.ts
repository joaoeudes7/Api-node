import * as dotenv from 'dotenv';

import * as fastify from 'fastify';
import * as rateLimit from 'fastify-rate-limit';
import * as helmet from 'fastify-helmet';
import * as cors from 'fastify-cors';
import * as jwt from 'fastify-jwt';
import * as sensible from 'fastify-sensible';

import Register from './routes/Register.routes';
import Users from './routes/Users.routes';
import Auth from './routes/Auth.routes';

class App {

  serve = fastify({ logger: false });

  constructor() {
    // load env configs
    dotenv.config();

    this.initMiddlewares();
    this.initRouters();
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
      timeWindow: 60 * 1000
    });
  }

  initRouters() {
    this.serve.get('/', async (req, res) => {
      res.send('The API-REST is Online');
    });

    // Modules routers
    this.serve
      .register(Auth)
      .register(Register)
      .register(Users);
  }
}

export default new App();
