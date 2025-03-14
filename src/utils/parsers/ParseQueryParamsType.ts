export type ParseQueryAllBlogsParamsType = {
  searchNameTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageNumber?: string | number;
  pageSize?: string | number;
};

export type ParseQueryPostsForBlogParamsType = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};

export type ParseQueryAllPostsParamsType = {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageNumber?: string | number;
  pageSize?: string | number;
};

export type ParseQueryAllUsersParamsType = {
  searchLoginTerm?: string;
  searchEmailTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageNumber?: string | number;
  pageSize?: string | number;
};
