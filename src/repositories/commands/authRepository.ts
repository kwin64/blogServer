import { User } from '../../models';
import ApiError from '../../utils/ApiError';

const authRepository = {
  async findByLoginOrEmail(loginOrEmail: string) {
    try {
      const user = await User.findOne({
        $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
      });
      if (!user) {
        throw ApiError.notFound('user not found');
      }
      return {
        user: {
          id: user._id,
          login: user.login,
          email: user.email,
          password: user.password!,
        },
      };
    } catch (error) {
      throw ApiError.unauthorized('Invalid login or email');
    }
  },
};

export default authRepository;
