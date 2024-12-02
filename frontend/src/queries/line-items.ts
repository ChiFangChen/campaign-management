import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axiosInstance from './api/axios';
import { LineItemsAPI } from './api';
import { getAllKeys, getDetailKeys } from './utils';

const moduleName = 'line-items';

export const LineItemsQueryKeys = {
  all: getAllKeys(moduleName),
  detail: getDetailKeys(moduleName),
};

export const fetchLineItems = async (paginationParams: PaginationParams) => {
  const response = await axiosInstance.get(LineItemsAPI.list, { params: paginationParams });
  return response.data;
};

export const useLineItems = (paginationParams: PaginationParams) =>
  useQuery({
    queryKey: LineItemsQueryKeys.all(paginationParams),
    queryFn: () => fetchLineItems(paginationParams),
    placeholderData: keepPreviousData,
  });

export const fetchLineItemDetail = async (id: string) => {
  const response = await axiosInstance.get(LineItemsAPI.detail(id));
  return response.data;
};

export const useLineItemDetail = (id: string) =>
  useQuery({ queryKey: LineItemsQueryKeys.detail(id), queryFn: () => fetchLineItemDetail(id) });
