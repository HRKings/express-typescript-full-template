import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { NotFoundHandler, ErrorHandler } from '@/utils/Middlewares';
import { isProductionEnvironment, isTestingEnvironment } from '@/utils/Utilities';

import PokemonAPIController from '@/controllers/VersionedAPIRouter';

dotenv.config();

const server = express();

if (!isTestingEnvironment()) {
  server.use(morgan(isProductionEnvironment() ? 'common' : 'dev'));
}

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (_, response) => {
  response.json({
    message: '👋🌎🌍🌏 - Hello World!',
  });
});

server.use('/api/v1', PokemonAPIController);

server.use(NotFoundHandler);
server.use(ErrorHandler);

export default server;
