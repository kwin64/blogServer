import {
  ParseQueryAllBlogsParamsType,
  ParseQueryPostsForBlogParamsType,
} from './parseQueryParamsType';

const parseQueryParams = {
  allBlogs(query: ParseQueryAllBlogsParamsType) {
    const searchValue = query.searchValue?.toString().trim() || null;

    const sortBy = query.sortBy?.toString().trim() || 'createdAt';

    const sortDirection =
      query.sortDirection?.toString().trim() === 'asc' ? 'asc' : 'desc';

    const pageNumber =
      Number(query.page) && Number(query.page) > 0 ? Number(query.page) : 1;

    const pageSize =
      Number(query.limit) && Number(query.limit) > 0 ? Number(query.limit) : 10;

    const offset = (pageNumber - 1) * pageSize;

    return { searchValue, sortBy, sortDirection, pageNumber, pageSize, offset };
  },
  postsForBlog(query: ParseQueryPostsForBlogParamsType) {
    const sortBy = query.sortBy?.toString().trim() || 'createdAt';

    const sortDirection =
      query.sortDirection?.toString().trim() === 'asc' ? 'asc' : 'desc';

    const pageNumber =
      Number(query.pageNumber) > 0 ? Number(query.pageNumber) : 1;

    const pageSize =
      Number(query.pageNumber) && Number(query.pageSize) > 0
        ? Number(query.pageSize)
        : 10;

    const offset = (pageNumber - 1) * pageSize;

    return { sortBy, sortDirection, pageNumber, pageSize, offset };
  },
};
export default parseQueryParams;
