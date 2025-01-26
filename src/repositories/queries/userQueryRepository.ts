import { FilterQuery } from 'mongoose';
import { mapUserDocumentWithPagination } from '../../mappers/mapUserDocumentWithPagination';
import { User } from '../../models';
import { IUser } from '../../models/UserModel';

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
      if (searchLoginTerm) {
        filter.login = { $regex: searchLoginTerm, $options: 'i' };
      }
      if (searchEmailTerm) {
        filter.email = { $regex: searchEmailTerm, $options: 'i' };
      }
      const totalCount = await User.countDocuments({});
      const users = await User.find({})
        .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
        .skip(offset)
        .limit(pageSize)
        .exec();
      const pagesCount = Math.ceil(totalCount / pageSize);

      return mapUserDocumentWithPagination(
        users,
        pagesCount,
        pageNumber,
        pageSize,
        totalCount
      );
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  },
};
export default userQueryRepository;
