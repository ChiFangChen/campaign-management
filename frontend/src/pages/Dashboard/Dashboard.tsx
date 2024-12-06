import { formatAmount } from '@/lib/formatter-utils';
import { useDashboard } from '@/queries/dashboard';
import { Title } from '@/components';
import { TabbedAmountComparisonChart } from '@/components';
import { DataCard } from './DataCard';

export const Dashboard = () => {
  const { data, isLoading } = useDashboard();

  return (
    <div>
      <Title>Dashboard</Title>
      <div className="my-4 gap-4 flex flex-wrap">
        <TabbedAmountComparisonChart isLoading={isLoading} data={data?.amount} />
        <DataCard title="Total Campaigns" data={data?.totalCampaigns} isLoading={isLoading} />
        <DataCard title="Total Line Items" data={data?.totalLineItems} isLoading={isLoading} />
        <DataCard
          title="Total Adjustments"
          data={formatAmount(data?.totalAdjustments)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
