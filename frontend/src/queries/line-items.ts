import { useQuery } from '@tanstack/react-query';
import { fetchLineItemDetail } from './api';
import { getDetailKeys } from './utils';

const moduleName = 'line-items';

export const LineItemsQueryKeys = {
  detail: getDetailKeys(moduleName),
};

export const useLineItemDetail = (id: string) =>
  useQuery({ queryKey: LineItemsQueryKeys.detail(id), queryFn: () => fetchLineItemDetail(id) });
