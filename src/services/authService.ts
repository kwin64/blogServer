import authRepository from '../repositories/commands/authRepository';
import ApiError from '../utils/ApiError';
import bcryptHandler from '../utils/hashHandler';
import jwtToken from '../utils/jwtToken';

const authService = {
  async login(loginOrEmail: string, password: string) {
    const loginValue = await authRepository.findByLoginOrEmail(loginOrEmail);

    const isPasswordValid = bcryptHandler.comparePassword(
      password,
      loginValue.user.password
    );

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid password');
    }

    const token = jwtToken.generateToken(loginValue.user.id.toString());

    return token;
  },
};

export default authService;
