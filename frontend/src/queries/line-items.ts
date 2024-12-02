import { useQuery } from '@tanstack/react-query';
import axiosInstance from './api/axios';
import { LineItemsAPI } from './api';

export const LineItemsQueryKeys = {
  all: ['line-items'],
  detail: (id: string) => ['line-items', id],
};

export const fetchLineItems = async () => {
  const response = await axiosInstance.get(LineItemsAPI.list);
  return response.data;
};

export const useLineItems = () =>
  useQuery({ queryKey: LineItemsQueryKeys.all, queryFn: fetchLineItems });

export const fetchLineItemDetail = async (id: string) => {
  const response = await axiosInstance.get(LineItemsAPI.detail(id));
  return response.data;
};

export const useLineItemDetail = (id: string) =>
  useQuery({ queryKey: LineItemsQueryKeys.detail(id), queryFn: () => fetchLineItemDetail(id) });
