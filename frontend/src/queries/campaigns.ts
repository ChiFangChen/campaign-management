import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchCampaigns, fetchCampaignDetail } from '@/apis';
import { getAllKeys, getDetailKeys } from './utils';

const moduleName = 'campaigns';

export const CampaignsQueryKeys = {
  all: getAllKeys(moduleName),
  detail: getDetailKeys(moduleName),
};

export const useCampaigns = (paginationParams: PaginationParams) =>
  useQuery({
    queryKey: CampaignsQueryKeys.all(paginationParams),
    queryFn: () => fetchCampaigns(paginationParams),
    placeholderData: keepPreviousData,
  });

export const useCampaignDetail = (id: string) =>
  useQuery({ queryKey: CampaignsQueryKeys.detail(id), queryFn: () => fetchCampaignDetail(id) });
