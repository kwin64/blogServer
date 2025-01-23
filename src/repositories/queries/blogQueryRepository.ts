import { mapBlogDocumentToBlogType } from '../../mappers/mapBlogDocumentToBlogType';
import { Blog } from '../../models';
import { BlogDocument } from '../../models/BlogModel';

const blogQueryRepository = {
  async getAllBlogs(
    searchValue: string | null,
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number
  ) {
    const filter = searchValue
      ? { name: { $regex: searchValue, $options: 'i' } }
      : {};

    const validSortDirection = sortDirection === 'asc' ? 1 : -1;

    const blogs = await Blog.find(filter)
      .sort({ [sortBy]: validSortDirection })
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
    blogId: string
  ) {
    const validSortDirection = sortDirection === 'asc' ? 1 : -1;

    const blogs = await Blog.find()
      .sort({ [sortBy]: validSortDirection })
      .skip(offset)
      .limit(pageSize)
      .exec();

    return blogs.map((blog) => mapBlogDocumentToBlogType(blog as BlogDocument));
  },
};
export default blogQueryRepository;
