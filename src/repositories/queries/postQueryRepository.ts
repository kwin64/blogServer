import { mapPostDocumentWithPagination } from '../../mappers/mapPostDocumentWithPagination';
import { Post } from '../../models';

const postQueryRepository = {
  async getAllPosts(
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number,
    pageNumber: number
  ) {
    try {
      const totalCount = await Post.countDocuments({});
      const posts = await Post.find({})
        .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
        .skip(offset)
        .limit(pageSize)
        .exec();
      const pagesCount = Math.ceil(totalCount / pageSize);

      return mapPostDocumentWithPagination(
        posts,
        pagesCount,
        pageNumber,
        pageSize,
        totalCount
      );
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  },
};
export default postQueryRepository;
