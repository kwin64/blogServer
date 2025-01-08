import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
const inputValidationMIddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorsResult = validationResult(req);
  if (!errorsResult.isEmpty()) {
    const firstError = errorsResult.array()[0];
    res.status(HTTP_STATUSES.BAD_REQUEST).json({
      errorsMessages: [{ message: firstError.msg, field: firstError.path }],
    });
  } else {
    next();
  }
};
export default inputValidationMIddleware;
