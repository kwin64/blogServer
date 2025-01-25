import { mapBlogDocumentWithPaginationType } from '../../mappers/mapBlogDocumentWithPaginationType';
import { mapPostDocumentToBlogWithPaginationType } from '../../mappers/mapPostDocumentToBlogWithPaginationType';
import { Blog, Post } from '../../models';

const blogQueryRepository = {
  async getAllBlogs(
    searchValue: string | null,
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number,
    pageNumber: number
  ) {
    const totalCount = await Blog.countDocuments({});
    const filter = searchValue
      ? { name: { $regex: searchValue, $options: 'i' } }
      : {};
    const blogs = await Blog.find(filter)
      .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
      .skip(offset)
      .limit(pageSize)
      .exec();
    const pagesCount = Math.ceil(totalCount / pageSize);

    return mapBlogDocumentWithPaginationType(
      blogs,
      pagesCount,
      pageNumber,
      pageSize,
      totalCount
    );
  },
  async getAllPostsBlog(
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number,
    blogId: string,
    pageNumber: number
  ) {
    const totalCount = await Post.countDocuments({ blogId });
    const posts = await Post.find({ blogId })
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
export default blogQueryRepository;
