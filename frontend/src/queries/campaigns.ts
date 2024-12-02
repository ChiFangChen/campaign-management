import { useQuery } from '@tanstack/react-query';
import axiosInstance from './api/axios';
import { CampaignsAPI } from './api';

export const CampaignsQueryKeys = {
  all: ['campaigns'],
  detail: (id: string) => ['campaigns', id],
};

export const fetchCampaigns = async () => {
  const response = await axiosInstance.get(CampaignsAPI.list);
  return response.data;
};

export const useCampaigns = () =>
  useQuery({ queryKey: CampaignsQueryKeys.all, queryFn: fetchCampaigns });

export const fetchCampaignDetail = async (id: string) => {
  const response = await axiosInstance.get(CampaignsAPI.detail(id));
  return response.data;
};

export const useCampaignDetail = (id: string) =>
  useQuery({ queryKey: CampaignsQueryKeys.detail(id), queryFn: () => fetchCampaignDetail(id) });
