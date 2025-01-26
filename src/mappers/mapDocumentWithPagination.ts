interface IPagination<T> {
  pagesCount: number;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}

export const mapDocumentWithPagination = <T, U>(
  documentDocs: T[],
  pagesCount: number,
  pageNumber: number,
  pageSize: number,
  totalCount: number,
  mapItem: (doc: T) => U
): IPagination<U> => {
  return {
    pagesCount,
    pageNumber,
    pageSize,
    totalCount,
    items: documentDocs.map(mapItem),
  };
};
