import axiosInstance from './axios';

const InvoicesAPI: ResourceApi = {
  list: '/invoices',
  detail: (id) => `/invoices/${id}`,
  create: '/invoices',
  update: (id) => `/invoices/${id}`,
  delete: (id) => `/invoices/${id}`,
};

export const fetchInvoices = async (paginationParams: PaginationParams) => {
  const response = await axiosInstance.get<PagedData<Invoice[]>>(InvoicesAPI.list, {
    params: paginationParams,
  });
  return response.data;
};

export const fetchInvoiceDetails = async (id: string) => {
  const response = await axiosInstance.get<InvoiceDetails>(InvoicesAPI.detail(id));
  return response.data;
};

type UpdateInvoiceParam = {
  id: string;
  data: {
    adjustments: number;
  };
};

export const updateInvoice = async ({ id, data }: UpdateInvoiceParam) => {
  const response = await axiosInstance.patch(InvoicesAPI.update(id), data);
  return response.data;
};
