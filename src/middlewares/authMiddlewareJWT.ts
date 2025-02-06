import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import jwtToken from '../utils/jwtToken';

const authMiddlewareJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw ApiError.unauthorized('No token provided');
    }

    const token = authHeader.split(' ')[1];

    const verifedToken = jwtToken.verifyToken(token);

    if (!verifedToken) {
      throw ApiError.unauthorized('Invalid token');
    }

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
