import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchCampaigns, fetchCampaignDetails } from '@/apis';
import { getAllKeys, getDetailsKeys } from './utils';

const moduleName = 'campaigns';

export const CampaignsQueryKeys = {
  all: getAllKeys(moduleName),
  detail: getDetailsKeys(moduleName),
};

export const useCampaigns = (paginationParams: PaginationParams) =>
  useQuery({
    queryKey: CampaignsQueryKeys.all(paginationParams),
    queryFn: () => fetchCampaigns(paginationParams),
    placeholderData: keepPreviousData,
  });

export const useCampaignDetails = (id: string) =>
  useQuery({ queryKey: CampaignsQueryKeys.detail(id), queryFn: () => fetchCampaignDetails(id) });
