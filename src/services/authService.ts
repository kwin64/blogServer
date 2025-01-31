import { User } from '../models';
import authRepository from '../repositories/commands/authRepository';
import ApiError from '../utils/ApiError';

const authService = {
  async login(authData: { loginOrEmail: string; password: string }) {
    // const token = jwt.sign(
    //   { userId: user._id, login: user.login },
    //   SETTINGS.JWT_SECRET || 'default_secret',
    //   { expiresIn: '1h' }
    // );
    return await authRepository.login(authData);
  },
};

export default authService;
