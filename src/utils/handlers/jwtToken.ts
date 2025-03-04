import jwt, { VerifyErrors } from 'jsonwebtoken';
import ApiError from './ApiError';

const jwtToken = {
  generateToken(id: string, login: string, secretKey: string, expires: number) {
    return jwt.sign({ id, login }, secretKey, {
      expiresIn: expires,
    });
  },

  verifyToken(token: string, secretKey: string) {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      const jwtError = error as VerifyErrors;

      if (jwtError.name === 'TokenExpiredError') {
        throw ApiError.unauthorized(jwtError.message);
      } else if (jwtError.name === 'JsonWebTokenError') {
        throw ApiError.unauthorized(jwtError.message);
      } else {
        throw ApiError.unauthorized(jwtError.message);
      }
    }
  },
};

export default jwtToken;
