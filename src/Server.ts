import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import { NotFoundHandler, ErrorHandler } from './utils/Middlewares.js';
import SampleController from './controllers/SampleController.js';

dotenv.config();

const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (_, response) => {
  response.json({
    message: '👋🌎🌍🌏 - Hello World!',
  });
});

server.use('/api/v1', SampleController);

server.use(NotFoundHandler);
server.use(ErrorHandler);

export default server;
