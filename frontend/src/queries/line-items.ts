import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchLineItems, fetchLineItemDetail } from './api';
import { getAllKeys, getDetailKeys } from './utils';

const moduleName = 'line-items';

export const LineItemsQueryKeys = {
  all: getAllKeys(moduleName),
  detail: getDetailKeys(moduleName),
};

export const useLineItems = (paginationParams: PaginationParams) =>
  useQuery({
    queryKey: LineItemsQueryKeys.all(paginationParams),
    queryFn: () => fetchLineItems(paginationParams),
    placeholderData: keepPreviousData,
  });

export const useLineItemDetail = (id: string) =>
  useQuery({ queryKey: LineItemsQueryKeys.detail(id), queryFn: () => fetchLineItemDetail(id) });
