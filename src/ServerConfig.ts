import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { NotFoundHandler, ErrorHandler } from './utils/Middlewares.js';
import { ServerOptions } from './types/ServerOptions.js';
import { isProductionEnvironment } from './utils/Utilities.js';

import SampleController from './controllers/SampleController.js';

export default class ServerConfig {
  options: ServerOptions = {};

  expressInstance = express();

  constructor(options?: ServerOptions) {
    this.options = options || this.options;

    this.expressInstance.use(morgan(isProductionEnvironment ? 'common' : 'dev'));
    this.expressInstance.use(helmet());
    this.expressInstance.use(cors());
    this.expressInstance.use(express.json());

    this.expressInstance.get('/', (_, response) => {
      response.json({
        message: '👋🌎🌍🌏 - Hello World!',
      });
    });

    this.expressInstance.use('/api/v1', SampleController);

    this.expressInstance.use(NotFoundHandler);
    this.expressInstance.use(ErrorHandler);
  }
}
