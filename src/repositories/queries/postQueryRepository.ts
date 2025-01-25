import { mapBlogDocumentWithPaginationType } from '../../mappers/mapBlogDocumentWithPaginationType';
import { mapPostDocumentToBlogWithPaginationType } from '../../mappers/mapPostDocumentToBlogWithPaginationType';
import { Post } from '../../models';

const postQueryRepository = {
  async getAllPosts(
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number,
    pageNumber: number
  ) {
    const totalCount = await Post.countDocuments({});
    const posts = await Post.find({})
      .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
      .skip(offset)
      .limit(pageSize)
      .exec();
    const pagesCount = Math.ceil(totalCount / pageSize);

    return mapPostDocumentToBlogWithPaginationType(
      posts,
      pagesCount,
      pageNumber,
      pageSize,
      totalCount
    );
  },
};
export default postQueryRepository;
