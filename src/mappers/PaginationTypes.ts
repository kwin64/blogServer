export type PaginationTypes<T> = {
  items: T[];
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
};
