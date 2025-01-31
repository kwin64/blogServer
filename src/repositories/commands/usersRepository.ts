import { User } from '../../models';

const userRepository = {
  async create(userData: { login: string; email: string; password: string }) {
    const newUser = new User({
      login: userData.login,
      email: userData.email,
      password: userData.password,
    });
    return await newUser.save();
  },
  async findByLogin(login: string) {
    return await User.findOne({ login });
  },

  async findByEmail(email: string) {
    return await User.findOne({ email });
  },
  async delete(id: string) {
    return await User.findByIdAndDelete(id);
  },
};

export default userRepository;
