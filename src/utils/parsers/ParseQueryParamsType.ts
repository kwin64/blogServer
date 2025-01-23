export type ParseQueryAllBlogsParamsType = {
  searchValue?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: string | number;
  limit?: string | number;
};

export type ParseQueryPostsForBlogParamsType = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
