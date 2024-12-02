import { useQuery } from '@tanstack/react-query';
import axiosInstance from './api/axios';
import { InvoicesAPI } from './api';

export const InvoicesQueryKeys = {
  all: ['invoices'],
  detail: (id: string) => ['invoices', id],
};

export const fetchInvoices = async () => {
  const response = await axiosInstance.get(InvoicesAPI.list);
  return response.data;
};

export const useInvoices = () =>
  useQuery({ queryKey: InvoicesQueryKeys.all, queryFn: fetchInvoices });

export const fetchInvoiceDetail = async (id: string) => {
  const response = await axiosInstance.get(InvoicesAPI.detail(id));
  return response.data;
};

export const useInvoiceDetail = (id: string) =>
  useQuery({ queryKey: InvoicesQueryKeys.detail(id), queryFn: () => fetchInvoiceDetail(id) });
