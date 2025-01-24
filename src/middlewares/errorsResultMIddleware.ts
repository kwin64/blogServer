import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
const errorsResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorsResult: Result<ValidationError> = validationResult(req);
  if (!errorsResult.isEmpty()) {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({
      errorsMessages: errorsResult
        .array({ onlyFirstError: true })
        .map((error) => ({
          message: error.msg,
          field: (error as any).path,
        })),
    });
  } else {
    next();
  }
};
export default errorsResultMiddleware;
