import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchInvoices, fetchInvoiceDetails } from '@/apis';
import { getAllKeys, getDetailsKeys } from './utils';

export const moduleName = 'invoices';

export const InvoicesQueryKeys = {
  all: getAllKeys(moduleName),
  detail: getDetailsKeys(moduleName),
};

export const useInvoices = (paginationParams: PaginationParams) =>
  useQuery({
    queryKey: InvoicesQueryKeys.all(paginationParams),
    queryFn: () => fetchInvoices(paginationParams),
    placeholderData: keepPreviousData,
  });

export const useInvoiceDetails = (id: string) =>
  useQuery({ queryKey: InvoicesQueryKeys.detail(id), queryFn: () => fetchInvoiceDetails(id) });
