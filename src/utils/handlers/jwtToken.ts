import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../errors/CustomError ';
import { HTTP_STATUSES } from '../constants/httpStatuses';

const jwtToken = {
  generateToken(
    param1: string,
    param2: string,
    secretKey: string,
    expires: number
  ) {
    return jwt.sign({ param1, param2 }, secretKey, {
      expiresIn: expires,
    });
  },

  verifyToken(token: string, secretKey: string): JwtPayload {
    try {
      return jwt.verify(token, secretKey) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new CustomError('Token expired', HTTP_STATUSES.UNAUTHORIZED);
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new CustomError('Invalid token', HTTP_STATUSES.UNAUTHORIZED);
      } else {
        throw new CustomError(
          'Token verification failed',
          HTTP_STATUSES.INTERNAL_SERVER_ERROR
        );
      }
    }
  },
};

export default jwtToken;
