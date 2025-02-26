import jwt from 'jsonwebtoken';
import SETTINGS from '../constants/settings';

const jwtToken = {
  generateToken(id: string, login: string, secretKey: string, expires: number) {
    return jwt.sign({ id, login }, secretKey, {
      expiresIn: expires,
    });
  },

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, SETTINGS.JWT_ACCESS_KEY);
      return decoded;
    } catch (err) {
      return null;
    }
  },
};

export default jwtToken;
