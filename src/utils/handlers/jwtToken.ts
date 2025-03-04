import jwt from 'jsonwebtoken';

const jwtToken = {
  generateToken(id: string, login: string, secretKey: string, expires: number) {
    return jwt.sign({ id, login }, secretKey, {
      expiresIn: expires,
    });
  },

  verifyToken(token: string, secretKey: string) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      return null;
    }
  },
};

export default jwtToken;
