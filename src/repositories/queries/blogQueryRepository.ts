import { mapBlogDocumentToBlogType } from '../../mappers/mapBlogDocumentToBlogType';
import { mapBlogDocumentToBlogWithPaginationType } from '../../mappers/mapBlogDocumentToBlogWithPaginationType';
import { mapPostDocumentToPostType } from '../../mappers/mapPostDocumentToPostType';
import { Blog, Post } from '../../models';
import { BlogDocument } from '../../models/BlogModel';
import { PostDocument } from '../../models/PostModel';

const blogQueryRepository = {
  async getAllBlogs(
    searchValue: string | null,
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number,
    pageNumber: number
  ) {
    const filter = searchValue
      ? { name: { $regex: searchValue, $options: 'i' } }
      : {};

    const blogs = await Blog.find(filter)
      .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
      .skip(offset)
      .limit(pageSize)
      .exec();

    return blogs.map((blog) => mapBlogDocumentToBlogType(blog as BlogDocument));
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

    return mapBlogDocumentToBlogWithPaginationType(
      posts,
      pagesCount,
      pageNumber,
      pageSize,
      totalCount
    );
  },
};
export default blogQueryRepository;
