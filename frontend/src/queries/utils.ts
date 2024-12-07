export const getAllKeys = (moduleName: string) => (paginationParams: PaginationParams) =>
  [moduleName, paginationParams.pageIndex, paginationParams.pageSize];

export const getDetailsKeys = (moduleName: string) => (id: string) => [moduleName, id];
