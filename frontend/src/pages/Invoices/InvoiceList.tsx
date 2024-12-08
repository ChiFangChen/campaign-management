import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ColumnDef } from '@tanstack/react-table';

import { routes } from '@/routes';
import { readableTime } from '@/lib/formatter-utils';
import { usePagination } from '@/hooks';
import { useInvoices } from '@/queries';
import { Title, Table } from '@/components';

export const InvoiceList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const paginationState = usePagination();
  const { data, isLoading, isFetching } = useInvoices(paginationState.pagination);

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'id',
      header: t('id'),
    },
    {
      accessorFn: ({ createdAt }) => readableTime(createdAt),
      header: t('createdAt'),
    },
    {
      accessorFn: ({ updatedAt }) => readableTime(updatedAt),
      header: t('lastUpdatedAt'),
    },
    {
      accessorKey: 'totalAmount',
      header: t('Total {{name}}', { name: t('amount') }),
      meta: {
        type: 'currency',
      },
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {t('head.invoiceList.title', { titlePostFix: t('campaignManagementSystem') })}
        </title>
        <meta name="description" content={t('head.invoiceList.description')} />
      </Helmet>
      <div>
        <Title>{t('invoices')}</Title>
        <Table
          columns={columns}
          data={data?.data}
          paginationData={data?.pagination}
          isFetching={isFetching}
          isLoading={isLoading}
          paginationState={paginationState}
          onRowClick={(row) => {
            navigate(`${routes.invoices}/${row.original.id}`);
          }}
        />
      </div>
    </>
  );
};
