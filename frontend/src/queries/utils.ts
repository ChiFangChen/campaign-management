export const getAllKeys = (moduleName: string) => (paginationParams: PaginationParams) =>
  [moduleName, paginationParams.page, paginationParams.per_page];
export const getDetailKeys = (moduleName: string) => (id: string) => [moduleName, id];
