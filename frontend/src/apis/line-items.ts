import axiosInstance from './axios';

const LineItemsAPI: Omit<ResourceApi, 'list'> = {
  detail: (id) => `/line_items/${id}`,
  create: '/line_items',
  update: (id) => `/line_items/${id}`,
  delete: (id) => `/line_items/${id}`,
};

export const fetchLineItemDetails = async (id: string) => {
  const response = await axiosInstance.get<LineItemDetails>(LineItemsAPI.detail(id));
  return response.data;
};
