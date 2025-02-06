import jwt from 'jsonwebtoken';
import SETTINGS from './constants/settings';

const jwtToken = {
  generateToken(id: string) {
    return jwt.sign({ id }, SETTINGS.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
  },
  verifyToken(token: string) {
    try {
      return jwt.verify(token, SETTINGS.JWT_SECRET_KEY);
    } catch (err) {
      return null;
    }
  },
};

export default jwtToken;
