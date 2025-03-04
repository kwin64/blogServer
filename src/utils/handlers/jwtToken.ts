import jwt from 'jsonwebtoken';

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
      return null;
    }
  },
};

export default jwtToken;
