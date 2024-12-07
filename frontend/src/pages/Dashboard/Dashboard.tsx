import { useTranslation } from 'react-i18next';

import { formatAmount } from '@/lib/formatter-utils';
import { useDashboard } from '@/queries/dashboard';
import { Title, TabbedAmountComparisonChart } from '@/components';
import { DataCard } from './DataCard';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useDashboard();

  return (
    <div>
      <Title>{t('dashboard')}</Title>
      <div className="my-4 gap-4 flex flex-wrap">
        <TabbedAmountComparisonChart isLoading={isLoading} data={data?.amount} />
        <DataCard
          title={t('Total {{name}}', { name: t('campaigns') })}
          data={data?.totalCampaigns}
          isLoading={isLoading}
        />
        <DataCard
          title={t('Total {{name}}', { name: t('lineItems') })}
          data={data?.totalLineItems}
          isLoading={isLoading}
        />
        <DataCard
          title={t('Total {{name}}', { name: t('adjustments') })}
          data={formatAmount(data?.totalAdjustments)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
