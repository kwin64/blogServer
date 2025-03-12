import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../errors/CustomError ';
import { HTTP_STATUSES } from '../constants/httpStatuses';

const jwtToken = {
  generateToken(id: string, login: string, secretKey: string, expires: number) {
    return jwt.sign({ id, login }, secretKey, {
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
  generateSessionToken(
    userId: string,
    deviceId: string,
    secretKey: string,
    expires: number
  ) {
    return jwt.sign({ userId, deviceId }, secretKey, {
      expiresIn: expires,
    });
  },
};

export default jwtToken;
