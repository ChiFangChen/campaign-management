export const getAllKeys = (moduleName: string) => (paginationParams: PaginationParams) =>
  [moduleName, paginationParams.pageIndex, paginationParams.pageSize];

export const getDetailKeys = (moduleName: string) => (id: string) => [moduleName, id];
