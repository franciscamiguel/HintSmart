export class Pagination {
  page = 0;
  size = 0;
  totalRecords = 0;
  search = '';
}

export class PaginatedResult<T> {
  result!: T;
  pagination!: Pagination;
}