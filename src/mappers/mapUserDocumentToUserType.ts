import { IUser, UserDocument } from '../models/UserModel';

export const mapUserDocumentToUserType = (
  userDoc: UserDocument
): Omit<IUser, 'updatedAt' | 'password'> => {
  return {
    id: userDoc._id.toString(),
    login: userDoc.login,
    email: userDoc.email,
  };
};
