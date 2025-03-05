import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import SETTINGS from '../utils/constants/settings';
import { CustomError } from '../utils/errors/CustomError ';
import jwtToken from '../utils/handlers/jwtToken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

const authMiddlewareJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new CustomError('No token provided', HTTP_STATUSES.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    const verifiedToken = jwtToken.verifyToken(
      token,
      SETTINGS.JWT_ACCESS_KEY
    ) as JwtPayload;

    req.user = {
      userId: verifiedToken.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};
export default authMiddlewareJWT;
