import { User } from '../../models';
import { HTTP_STATUSES } from '../../utils/constants/httpStatuses';
import { CustomError } from '../../utils/errors/CustomError ';

const authRepository = {
  async findByLoginOrEmail(loginOrEmail: string) {
    const user = await User.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) {
      throw new CustomError('User not found', HTTP_STATUSES.NOT_FOUND);
    }

    return {
      user: {
        id: user._id,
        login: user.login,
        email: user.email,
        password: user.password!,
        isVerified: user.isVerified
      },
    };
  },
  async updateVerificationStatus(userId: string) {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    ).lean();

    if (!updatedUser) {
      throw new CustomError('User not found', HTTP_STATUSES.NOT_FOUND);
    }

    return updatedUser;
  },
  async findUser(email: string) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new CustomError('Database error findUser', HTTP_STATUSES.NOT_FOUND);
    }
  },
};

export default authRepository;
