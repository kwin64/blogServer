import { User } from '../../models';
import { UserDocument } from '../../models/UserModel';

const userRepository = {
  async createUser(userData: {
    login: string;
    email: string;
    password: string;
  }) {
    const newUser = new User({
      login: userData.login,
      email: userData.email,
      password: userData.password,
      isVerified: false,
    });
    return await newUser.save();
  },
  async findByLogin(login: string) {
    return await User.findOne({ login });
  },
  async findByEmail(email: string) {
    return await User.findOne({ email });
  },
  async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  },
  async getUserById(_id: string) {
    return await User.findOne({ _id }).lean<UserDocument>();
  },
};

export default userRepository;
