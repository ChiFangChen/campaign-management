import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axiosInstance from './api/axios';
import { CampaignsAPI } from './api';
import { getAllKeys, getDetailKeys } from './utils';

const moduleName = 'campaigns';

export const CampaignsQueryKeys = {
  all: getAllKeys(moduleName),
  detail: getDetailKeys(moduleName),
};

export const fetchCampaigns = async (paginationParams: PaginationParams) => {
  const response = await axiosInstance.get(CampaignsAPI.list, { params: paginationParams });
  return response.data;
};

export const useCampaigns = (paginationParams: PaginationParams) =>
  useQuery({
    queryKey: CampaignsQueryKeys.all(paginationParams),
    queryFn: () => fetchCampaigns(paginationParams),
    placeholderData: keepPreviousData,
  });

export const fetchCampaignDetail = async (id: string) => {
  const response = await axiosInstance.get(CampaignsAPI.detail(id));
  return response.data;
};

export const useCampaignDetail = (id: string) =>
  useQuery({ queryKey: CampaignsQueryKeys.detail(id), queryFn: () => fetchCampaignDetail(id) });
