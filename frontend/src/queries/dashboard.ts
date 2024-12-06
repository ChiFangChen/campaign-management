import { useQuery } from '@tanstack/react-query';

import { fetchDashboard } from '@/apis';

const moduleName = 'dashboard';

export const DashboardQueryKeys = {
  all: [moduleName],
};

export const useDashboard = () =>
  useQuery({
    queryKey: DashboardQueryKeys.all,
    queryFn: () => fetchDashboard(),
  });
