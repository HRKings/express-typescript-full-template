import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// Import helpers and utilities
import { NotFoundHandler, ErrorHandler } from '@/utils/Middlewares';
import { isProductionEnvironment, isTestingEnvironment } from '@/utils/Utilities';

// Import controllers and routers
import APIv1Router from '@/controllers/APIv1Router';

// Load the .env
dotenv.config();

/** Instance of an Express server */
const server = express();

// If we are not running automated tests, then start the logger
if (!isTestingEnvironment()) {
  // Use the 'common' preset in production
  // or the 'dev' one otherwise
  server.use(morgan(isProductionEnvironment() ? 'common' : 'dev'));
}

// Add the main middlewares
server.use(helmet()); // To help secure the server
server.use(cors()); // To enable CORS
server.use(express.json()); // To parse the body of the requests as JSON objects

// Set the default route, just to see if the server is working
server.get('/', (_, response) => {
  response.json({
    message: '👋🌎🌍🌏 - Hello World!',
  });
});

// Set the API Router to use the '/api/v1' route
server.use('/api/v1', APIv1Router);

// Add the Not Found Handler and the Error Handler
// (order matters, as we only handle and error if there's nothing more to do with it)
server.use(NotFoundHandler);
server.use(ErrorHandler);

export default server;
