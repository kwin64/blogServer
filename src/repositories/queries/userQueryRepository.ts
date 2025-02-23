import { FilterQuery } from 'mongoose';
import { mapUserDocumentToUserType } from '../../mappers/mapUserDocumentToUserType';
import { mapUserDocumentWithPagination } from '../../mappers/mapUserDocumentWithPagination';
import { User } from '../../models';
import { IUser, UserDocument } from '../../models/UserModel';
import ApiError from '../../utils/handlers/ApiError';

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
    const users = await User.find({
      $or: [{ login: login }, { email: email }],
    });

    const matches: { login?: string; email?: string } = {};

    users.forEach((user) => {
      if (user.login === login) matches.login = user.login;
      if (user.email === email) matches.email = user.email;
    });

    return matches;
  },
};
export default userQueryRepository;
