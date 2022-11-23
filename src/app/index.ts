import * as dotenv from 'dotenv';

// eslint-disable-next-line no-unused-vars
import fastify, { FastifyInstance } from 'fastify';
import rateLimit from 'fastify-rate-limit';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import jwt from 'fastify-jwt';
import compress from 'fastify-compress';
import sensible from 'fastify-sensible';

import Register from './routes/Register.routes';
import Users from './routes/Users.routes';
import Auth from './routes/Auth.routes';

class App {
  serve!: FastifyInstance;
  port = 3000;
  address = '127.0.0.1';

  constructor() {
    // load env configs
    dotenv.config();

    this.initServe();
    this.initMiddlewares();
    this.initRouters();
  }

  private initServe() {
    this.serve = fastify({ logger: false });
  }

  private initMiddlewares() {
    /**
     * SECURITY
     */
    this.serve.register(helmet);
    this.serve.register(cors);
    this.serve.register(rateLimit, {
      max: 100,
      timeWindow: 60 * 1000
    });

    /**
     * ERRORS
     */
    this.serve.register(sensible);

    /**
     * AUTH
     */
    this.serve.register(jwt, {
      secret: process.env.SECRET_KEY!!
    });

    /**
     * OTHERS
     */
    this.serve.register(compress, { inflateIfDeflated: true });
  }

  private initRouters() {
    this.serve.get('/', async (req, res) => {
      res.send('The API-REST is Online');
    });

    // Modules routers
    this.serve
      .register(Auth)
      .register(Register)
      .register(Users);
  }

  async start() {
    return await this.serve.listen(this.port, this.address);
  }
}

export default new App();
