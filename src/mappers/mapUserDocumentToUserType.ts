import { IUser, UserDocument } from '../models/UserModel';

export const mapUserDocumentToUserType = (
  userDoc: UserDocument
): Omit<IUser, 'password'> => {
  return {
    id: userDoc._id.toString(),
    login: userDoc.login,
    email: userDoc.email,
    createdAt: userDoc.createdAt,
  };
};
