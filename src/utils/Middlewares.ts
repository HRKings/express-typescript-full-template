/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from 'express';

import { isProductionEnvironment } from '@/utils/Utilities';

export function NotFoundHandler(request: Request, response: Response, next: NextFunction) {
  response.status(404);
  const error = new Error(`🔍 - Not Found - ${request.originalUrl}`);

  next(error);
}

export function ErrorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;

  response.status(statusCode);
  response.json({
    message: error.message,
    stack: isProductionEnvironment() ? '🥞 Nothing to see here 🥞' : error.stack,
  });
}
