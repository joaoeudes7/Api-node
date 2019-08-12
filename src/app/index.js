import dotenv from 'dotenv';

import fastify from 'fastify';
import mongodb from 'fastify-mongodb';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import jwt from 'fastify-jwt';

import Register from './routes/Register.routes';
import Project from './routes/Project.routes';
import Users from './routes/Users.routes';
import Auth from './routes/Auth.routes';
import app from '..';

class App {
  constructor() {
    // load env configs
    dotenv.config();

    this.serve = fastify({ logger: true });

    this.initMiddlewares();
    this.initRouters();
  }

  initMiddlewares() {
    this.serve.register(helmet);
    this.serve.register(cors);

    this.serve.register(jwt, {
      secret: process.env.SECRET_KEY
    });

    this.serve.register(mongodb, {
      forceClose: true,
      url: process.env.URI_MONGODB
    });
  }

  initRouters() {
    this.serve.get('/', async (req, res) => {
      res.send(`The API-REST is Online`);
    });

    // Modules routers
    this.serve.register(Auth);
    this.serve.register(Register);
    this.serve.register(Project);
    this.serve.register(Users);
  }
}

export default new App().serve
