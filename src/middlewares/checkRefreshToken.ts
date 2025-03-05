import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import { CustomError } from '../utils/errors/CustomError ';

export interface AuthRequestRT extends Request {
  refreshToken?: string;
}

const checkRefreshToken = async (
  req: AuthRequestRT,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new CustomError('No refresh token', HTTP_STATUSES.UNAUTHORIZED);
    }

    req.refreshToken = refreshToken;

    next();
  } catch (error) {
    next(error);
  }
};
export default checkRefreshToken;
