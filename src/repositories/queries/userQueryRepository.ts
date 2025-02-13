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

      if (searchLoginTerm && searchEmailTerm) {
        filter.$or = [
          { login: { $regex: searchLoginTerm, $options: 'i' } },
          { email: { $regex: searchEmailTerm, $options: 'i' } },
        ];
      } else if (searchLoginTerm) {
        filter.login = { $regex: searchLoginTerm, $options: 'i' };
      } else if (searchEmailTerm) {
        filter.email = { $regex: searchEmailTerm, $options: 'i' };
      }

      const totalCount = await User.countDocuments(filter);
      const pagesCount = Math.ceil(totalCount / pageSize);

      const users = await User.find(filter)
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
  async findUser(login: string, email: string) {
    try {
      const user = await User.findOne({
        $or: [{ login: login }, { email: email }],
      });

      if (user) {
        throw ApiError.badRequest(
          'The login or email address is already taken.'
        );
      }
      return user;
    } catch (error) {
      throw ApiError.internal('Failed to find user');
    }
  },
};
export default userQueryRepository;
