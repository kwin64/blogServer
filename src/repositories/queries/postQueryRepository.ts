import { mapPostDocumentToPostType } from '../../mappers/mapPostDocumentToPostType';
import { mapPostDocumentWithPagination } from '../../mappers/mapPostDocumentWithPagination';
import { Post } from '../../models';
import { PostDocument } from '../../models/PostModel';
import ApiError from '../../utils/ApiError';

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
  async getPostById(_id: string) {
    const post = await Post.findOne({ _id }).lean<PostDocument>();
    if (!post) {
      throw ApiError.internal('Failed to fetch posts');
    } else {
      return mapPostDocumentToPostType(post);
    }
  },
};
export default postQueryRepository;
