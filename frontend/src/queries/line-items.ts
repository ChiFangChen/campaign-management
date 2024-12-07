import { useQuery } from '@tanstack/react-query';

import { fetchLineItemDetails } from '@/apis';
import { getDetailsKeys } from './utils';

const moduleName = 'line-items';

export const LineItemsQueryKeys = {
  detail: getDetailsKeys(moduleName),
};

export const useLineItemDetails = (id: string) =>
  useQuery({ queryKey: LineItemsQueryKeys.detail(id), queryFn: () => fetchLineItemDetails(id) });
