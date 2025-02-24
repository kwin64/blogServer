import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import { CustomError } from '../utils/errors/CustomError ';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      errorsMessages: err.errorsMessages,
    });
  } else {
    res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).json({
      errorsMessages: [{ message: 'Internal Server Error', field: 'server' }],
    });
  }
};
