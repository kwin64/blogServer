import { IUserWithPagination, UserDocument } from '../models/UserModel';
import { mapDocumentWithPagination } from './mapDocumentWithPagination';

export const mapUserDocumentWithPagination = (
  userDoc: UserDocument[],
  pagesCount: number,
  pageNumber: number,
  pageSize: number,
  totalCount: number
): IUserWithPagination => {
  return mapDocumentWithPagination(
    userDoc,
    pagesCount,
    pageNumber,
    pageSize,
    totalCount,
    (userDoc) => ({
      id: userDoc._id.toString(),
      login: userDoc.login,
      email: userDoc.email,
      createdAt: userDoc.createdAt,
    })
  );
};
