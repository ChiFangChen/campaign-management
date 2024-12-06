import axiosInstance from './axios';

const DashboardAPI = {
  all: '/dashboard',
};

export const fetchDashboard = async () => {
  const response = await axiosInstance.get<DashboardData>(DashboardAPI.all);
  return response.data;
};
