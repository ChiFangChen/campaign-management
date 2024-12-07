import axiosInstance from './axios';

const CampaignsAPI: ResourceApi = {
  list: '/campaigns',
  detail: (id) => `/campaigns/${id}`,
  create: '/campaigns',
  update: (id) => `/campaigns/${id}`,
  delete: (id) => `/campaigns/${id}`,
};

export const fetchCampaigns = async (paginationParams: PaginationParams) => {
  const response = await axiosInstance.get<PagedData<Campaign[]>>(CampaignsAPI.list, {
    params: paginationParams,
  });
  return response.data;
};

export const fetchCampaignDetails = async (id: string) => {
  const response = await axiosInstance.get<CampaignDetails>(CampaignsAPI.detail(id));
  return response.data;
};
