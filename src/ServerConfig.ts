import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { NotFoundHandler, ErrorHandler } from './utils/Middlewares.js';
import { ServerOptions } from './types/ServerOptions.js';
import { isProductionEnvironment, isTestingEnvironment } from './utils/Utilities.js';
import DatabaseService from './services/DatabaseService.js';

import SampleController from './controllers/SampleController.js';

export default class ServerConfig {
  options: ServerOptions = {
    Port: Number(process.env.EXPRESS_PORT) || 5000,
  };

  database?: DatabaseService;

  expressInstance = express();

  constructor(options?: ServerOptions) {
    this.options = options || this.options;

    if (this.options.Database) {
      this.database = new DatabaseService(this.options.Database);
    }

    if (!isTestingEnvironment()) {
      this.expressInstance.use(morgan(isProductionEnvironment() ? 'common' : 'dev'));
    }

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
