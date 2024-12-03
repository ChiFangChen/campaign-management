import axiosInstance from './axios';

const LineItemsAPI: ResourceApi = {
  list: '/line_items',
  detail: (id) => `/line_items/${id}`,
  create: '/line_items',
  update: (id) => `/line_items/${id}`,
  delete: (id) => `/line_items/${id}`,
};

export const fetchLineItems = async (paginationParams: PaginationParams) => {
  const response = await axiosInstance.get(LineItemsAPI.list, { params: paginationParams });
  return response.data;
};

export const fetchLineItemDetail = async (id: string) => {
  const response = await axiosInstance.get(LineItemsAPI.detail(id));
  return response.data;
};
