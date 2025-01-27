import { mapUserDocumentToUserType } from '../../mappers/mapUserDocumentToUserType';
import { User } from '../../models';

const userRepository = {
  async create(userData: { login: string; email: string; password: string }) {
    try {
      const newUser = new User({
        login: userData.login,
        email: userData.email,
        password: userData.password,
      });

      const savedUser = await newUser.save();
      return mapUserDocumentToUserType(savedUser);
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database error while creating blog');
    }
  },
  async findByLogin(login: string) {
    return User.findOne({ login });
  },

  async findByEmail(email: string) {
    return User.findOne({ email });
  },
};

export default userRepository;
