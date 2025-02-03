import { User } from '../../models';
import ApiError from '../../utils/ApiError';

const authRepository = {
  async findByLoginOrEmail(loginOrEmail: string) {
    const user = await User.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) {
      throw ApiError.unauthorized('Invalid login or email');
    }

    return {
      user: {
        id: user._id,
        login: user.login,
        email: user.email,
        password: user.password!,
      },
    };
  },
};

export default authRepository;
