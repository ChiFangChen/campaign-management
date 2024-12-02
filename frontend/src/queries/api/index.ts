type PathFn = (data: string) => string;

type ResourceApi = {
  list: string;
  detail: PathFn;
  create: string;
  update: PathFn;
  delete: PathFn;
};

type SearchApi = {
  search: PathFn;
};

export const CampaignsAPI: ResourceApi = {
  list: '/campaigns',
  detail: (id) => `/campaigns/${id}`,
  create: '/campaigns',
  update: (id) => `/campaigns/${id}`,
  delete: (id) => `/campaigns/${id}`,
};

export const LineItemsAPI: ResourceApi = {
  list: '/line_items',
  detail: (id) => `/line_items/${id}`,
  create: '/line_items',
  update: (id) => `/line_items/${id}`,
  delete: (id) => `/line_items/${id}`,
};

export const InvoicesAPI: ResourceApi = {
  list: '/invoices',
  detail: (id) => `/invoices/${id}`,
  create: '/invoices',
  update: (id) => `/invoices/${id}`,
  delete: (id) => `/invoices/${id}`,
};

export const SearchAPI: SearchApi = {
  search: (query) => `/search?query=${query}`,
};
