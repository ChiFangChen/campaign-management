import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchInvoices, fetchInvoiceDetail } from './api';
import { getAllKeys, getDetailKeys } from './utils';

export const moduleName = 'invoices';

export const InvoicesQueryKeys = {
  all: getAllKeys(moduleName),
  detail: getDetailKeys(moduleName),
};

export const useInvoices = (paginationParams: PaginationParams) =>
  useQuery({
    queryKey: InvoicesQueryKeys.all(paginationParams),
    queryFn: () => fetchInvoices(paginationParams),
    placeholderData: keepPreviousData,
  });

export const useInvoiceDetail = (id: string) =>
  useQuery({ queryKey: InvoicesQueryKeys.detail(id), queryFn: () => fetchInvoiceDetail(id) });
