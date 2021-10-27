import { Request, Response } from 'express';

import { isProductionEnvironment } from './Utilities.js';

export function NotFoundHandler(request: Request, response: Response, next: any) {
  response.status(404);
  const error = new Error(`🔍 - Not Found - ${request.originalUrl}`);
  next(error);
}

export function ErrorHandler(error: Error, request: Request, response: Response) {
  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;

  response.status(statusCode);
  response.json({
    message: error.message,
    stack: isProductionEnvironment ? '🥞 Nothing to see here 🥞' : error.stack,
  });
}
