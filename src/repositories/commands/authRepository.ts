import { User } from '../../models';
import ApiError from '../../utils/ApiError';
import bcrypt from 'bcrypt';

const authRepository = {
  async login(authData: { loginOrEmail: string; password: string }) {
    const { loginOrEmail, password } = authData;

    const user = await User.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) {
      throw ApiError.unauthorized('Invalid login or email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid login or password');
    }

    return {
      user: {
        id: user._id,
        login: user.login,
        email: user.email,
      },
    };
  },
};

export default authRepository;
