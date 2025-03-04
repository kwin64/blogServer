import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../utils/handlers/ApiError';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import jwtToken from '../utils/handlers/jwtToken';
import SETTINGS from '../utils/constants/settings';

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
      throw ApiError.unauthorized('No token provided');
    }

    const token = authHeader.split(' ')[1];

    const verifiedToken = jwtToken.verifyToken(
      token,
      SETTINGS.JWT_ACCESS_KEY
    ) as JwtPayload;

    if (!verifiedToken) {
      throw ApiError.unauthorized('token no valid');
    }

    req.user = {
      userId: verifiedToken.id,
    };

    next();
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Unexpected error:', error);
      res
        .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }
};
export default authMiddlewareJWT;
