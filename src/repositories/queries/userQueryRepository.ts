import { FilterQuery } from 'mongoose';
import { mapUserDocumentToUserType } from '../../mappers/mapUserDocumentToUserType';
import { mapUserDocumentWithPagination } from '../../mappers/mapUserDocumentWithPagination';
import { User } from '../../models';
import { IUser, UserDocument } from '../../models/UserModel';
import ApiError from '../../utils/ApiError';

const userQueryRepository = {
  async getAllUsers(
    searchLoginTerm: string | null,
    searchEmailTerm: string | null,
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number,
    pageNumber: number
  ) {
    try {
      const filter: FilterQuery<IUser> = {};
      const totalCount = await User.countDocuments({});
      const pagesCount = Math.ceil(totalCount / pageSize);

      if (searchLoginTerm) {
        filter.login = { $regex: searchLoginTerm, $options: 'i' };
      }

      if (searchEmailTerm) {
        filter.email = { $regex: searchEmailTerm, $options: 'i' };
      }

      const users = await User.find({})
        .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
        .skip(offset)
        .limit(pageSize)
        .exec();

      return mapUserDocumentWithPagination(
        users,
        pagesCount,
        pageNumber,
        pageSize,
        totalCount
      );
    } catch (error) {
      throw ApiError.internal('Failed to fetch users');
    }
  },
  async getUserById(_id: string) {
    const user = await User.findOne({ _id }).lean<UserDocument>();
    if (!user) {
      throw ApiError.internal('Failed to fetch users');
    } else {
      return mapUserDocumentToUserType(user);
    }
  },
};
export default userQueryRepository;
