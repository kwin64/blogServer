import { mapUserDocumentToUserType } from '../../mappers/mapUserDocumentToUserType';
import { User } from '../../models';
import { IUser, UserDocument } from '../../models/UserModel';

const userRepository = {
  async create(newUser: UserDocument) {
    const savedUser = await newUser.save();
    return mapUserDocumentToUserType(savedUser);
  },
  async findByLogin(login: string) {
    return User.findOne({ login });
  },

  async findByEmail(email: string) {
    return User.findOne({ email });
  },
  async delete(id: string) {
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        return null;
      }
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Database error while deleting user');
    }
  },
};

export default userRepository;
