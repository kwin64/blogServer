import authRepository from '../repositories/commands/authRepository';
import ApiError from '../utils/ApiError';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authService = {
  async login(authData: { loginOrEmail: string; password: string }) {
    const loginValue = await authRepository.findByLoginOrEmail(
      authData.loginOrEmail
    );

    if (!loginValue) {
      throw ApiError.notFound('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      authData.password,
      loginValue.user.password
    );

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid login or password');
    }

    const token = jwt.sign(
      { userId: loginValue.user.id, login: loginValue.user.login },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return token;
  },
};

export default authService;
