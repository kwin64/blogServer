import { injectable } from 'inversify';
import { Blog, Post } from '../../models';
import { mapBlogDocumentWithPagination } from '../../mappers/mapBlogDocumentWithPagination';
import { mapPostDocumentWithPagination } from '../../mappers/mapPostDocumentWithPagination';
import { IBlogWithPagination } from '../../models/BlogModel';
import { IPostWithPagination } from '../../models/PostModel';

@injectable()
export class BlogQueryRepository {
  async getAllBlogs(
    searchNameTerm: string | null,
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number,
    pageNumber: number
  ): Promise<IBlogWithPagination> {
    const filter = searchNameTerm
      ? { name: { $regex: searchNameTerm, $options: 'i' } }
      : {};

    const totalCount = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
      .skip(offset)
      .limit(pageSize)
      .exec();

    const pagesCount = Math.ceil(totalCount / pageSize);

    return mapBlogDocumentWithPagination(
      blogs,
      pagesCount,
      pageNumber,
      pageSize,
      totalCount
    );
  }

  async getAllPostsBlog(
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number,
    blogId: string,
    pageNumber: number
  ): Promise<IPostWithPagination> {
    const blogExists = await Blog.exists({ _id: blogId });
    if (!blogExists) {
      throw new Error(`Blog with ID ${blogId} not found`);
    }

    const totalCount = await Post.countDocuments({ blogId });
    const posts = await Post.find({ blogId })
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
  }
}
