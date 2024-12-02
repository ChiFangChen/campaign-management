import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axiosInstance from './api/axios';
import { InvoicesAPI } from './api';
import { getAllKeys, getDetailKeys } from './utils';

const moduleName = 'invoices';

export const InvoicesQueryKeys = {
  all: getAllKeys(moduleName),
  detail: getDetailKeys(moduleName),
};

export const fetchInvoices = async (paginationParams: PaginationParams) => {
  const response = await axiosInstance.get(InvoicesAPI.list, { params: paginationParams });
  return response.data;
};

export const useInvoices = (paginationParams: PaginationParams) =>
  useQuery({
    queryKey: InvoicesQueryKeys.all(paginationParams),
    queryFn: () => fetchInvoices(paginationParams),
    placeholderData: keepPreviousData,
  });

export const fetchInvoiceDetail = async (id: string) => {
  const response = await axiosInstance.get(InvoicesAPI.detail(id));
  return response.data;
};

export const useInvoiceDetail = (id: string) =>
  useQuery({ queryKey: InvoicesQueryKeys.detail(id), queryFn: () => fetchInvoiceDetail(id) });
