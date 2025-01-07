import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HTTP_STATUSES } from '../constants/httpStatuses';

type ErrorsType = {
  errorsMessages: {
    message: string;
    field: string;
  }[];
};
const inputValidationMIddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorsResult = validationResult(req);
  if (!errorsResult.isEmpty()) {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({
      errorsMessages: errorsResult.array().map((error) => ({
        message: error.msg,
        field: error.path,
      })),
    });
  } else {
    next();
  }
};
export default inputValidationMIddleware;
