import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import { formatAmount } from '@/lib/formatter-utils';
import { useDashboard } from '@/queries';
import { Title, TabbedAmountComparisonChart } from '@/components';
import { DataCard } from './DataCard';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useDashboard();

  return (
    <>
      <Helmet>
        <title>{t('head.dashboard.title', { titlePostFix: t('campaignManagementSystem') })}</title>
        <meta name="description" content={t('head.dashboard.description')} />
      </Helmet>
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
    </>
  );
};
