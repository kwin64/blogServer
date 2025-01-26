import {
  ParseQueryAllBlogsParamsType,
  ParseQueryAllPostsParamsType,
  ParseQueryAllUsersParamsType,
  ParseQueryPostsForBlogParamsType,
} from './ParseQueryParamsType';

const parseQueryParams = {
  allBlogs(query: ParseQueryAllBlogsParamsType) {
    const searchNameTerm = query.searchNameTerm?.toString().trim() || null;

    const sortBy = query.sortBy?.toString().trim() || 'createdAt';

    const sortDirection =
      query.sortDirection?.toString().trim() === 'asc' ? 'asc' : 'desc';

    const pageNumber =
      Number(query.pageNumber) && Number(query.pageNumber) > 0
        ? Number(query.pageNumber)
        : 1;

    const pageSize =
      Number(query.pageSize) && Number(query.pageSize) > 0
        ? Number(query.pageSize)
        : 10;

    const offset = (pageNumber - 1) * pageSize;

    return {
      searchNameTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      offset,
    };
  },
  postsForBlog(query: ParseQueryPostsForBlogParamsType) {
    const sortBy = query.sortBy?.toString().trim() || 'createdAt';

    const sortDirection =
      query.sortDirection?.toString().trim() === 'asc' ? 'asc' : 'desc';

    const pageNumber =
      Number(query.pageNumber) && Number(query.pageNumber) > 0
        ? Number(query.pageNumber)
        : 1;

    const pageSize =
      Number(query.pageSize) && Number(query.pageSize) > 0
        ? Number(query.pageSize)
        : 10;

    const offset = (pageNumber - 1) * pageSize;

    return { sortBy, sortDirection, pageNumber, pageSize, offset };
  },
  allPosts(query: ParseQueryAllPostsParamsType) {
    const sortBy = query.sortBy?.toString().trim() || 'createdAt';

    const sortDirection =
      query.sortDirection?.toString().trim() === 'asc' ? 'asc' : 'desc';

    const pageNumber =
      Number(query.pageNumber) && Number(query.pageNumber) > 0
        ? Number(query.pageNumber)
        : 1;

    const pageSize =
      Number(query.pageSize) && Number(query.pageSize) > 0
        ? Number(query.pageSize)
        : 10;

    const offset = (pageNumber - 1) * pageSize;

    return {
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      offset,
    };
  },
  allUsers(query: ParseQueryAllUsersParamsType) {
    const searchLoginTerm = query.searchLoginTerm?.toString().trim() || null;
    const searchEmailTerm = query.searchEmailTerm?.toString().trim() || null;

    const sortBy = query.sortBy?.toString().trim() || 'createdAt';

    const sortDirection =
      query.sortDirection?.toString().trim() === 'asc' ? 'asc' : 'desc';

    const pageNumber =
      Number(query.pageNumber) && Number(query.pageNumber) > 0
        ? Number(query.pageNumber)
        : 1;

    const pageSize =
      Number(query.pageSize) && Number(query.pageSize) > 0
        ? Number(query.pageSize)
        : 10;

    const offset = (pageNumber - 1) * pageSize;

    return {
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      offset,
    };
  },
};
export default parseQueryParams;
