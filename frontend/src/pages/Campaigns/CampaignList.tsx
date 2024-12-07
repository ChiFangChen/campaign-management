import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ColumnDef } from '@tanstack/react-table';

import { routes } from '@/routes';
import { useCampaigns } from '@/queries/campaigns';
import { usePagination } from '@/hooks';
import { Title, Table } from '@/components';

export const CampaignList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const paginationState = usePagination();
  const { data, isLoading, isFetching } = useCampaigns(paginationState.pagination);

  const columns: ColumnDef<Campaign>[] = [
    {
      accessorKey: 'id',
      header: t('id'),
    },
    {
      accessorKey: 'name',
      header: t('name'),
    },
    {
      accessorKey: 'lineItemsCount',
      header: t('lineItemCount'),
    },
    {
      accessorKey: 'bookedTotalAmount',
      header: t('bookedAmount'),
      meta: {
        type: 'currency',
      },
    },
    {
      accessorKey: 'actualTotalAmount',
      header: t('actualAmount'),
      meta: {
        type: 'currency',
      },
    },
    {
      accessorKey: 'invoicesCount',
      header: t('invoiceCount'),
      meta: {
        align: 'right',
      },
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {t('head.campaignList.title', { titlePostFix: t('campaignManagementSystem') })}
        </title>
        <meta name="description" content={t('head.campaignList.description')} />
      </Helmet>
      <div>
        <Title>{t('campaigns')}</Title>
        <Table
          columns={columns}
          data={data?.data}
          paginationData={data?.pagination}
          isFetching={isFetching}
          isLoading={isLoading}
          paginationState={paginationState}
          onRowClick={(row) => {
            navigate(`${routes.campaigns}/${row.original.id}`);
          }}
        />
      </div>
    </>
  );
};
