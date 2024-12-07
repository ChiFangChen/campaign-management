import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ColumnDef } from '@tanstack/react-table';

import { routes } from '@/routes';
import { readableTime } from '@/lib/formatter-utils';
import { usePagination } from '@/hooks';
import { useLineItemDetails } from '@/queries/line-items';
import { Breadcrumb, Title, Table, SingleAmountComparisonChart, Skeleton } from '@/components';

export const LineItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, isFetching } = useLineItemDetails(id as string);
  const paginationState = usePagination();

  const breadcrumbList = [
    {
      name: t('campaigns'),
      url: routes.campaigns,
    },
    ...(data
      ? [
          {
            name: data?.campaign.name,
            url: `${routes.campaigns}/${data?.campaign.id}`,
          },
        ]
      : []),
  ];
  const invoiceColumns: ColumnDef<Omit<Invoice, 'totalAmount'>>[] = [
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
  ];

  return (
    <>
      <Helmet>
        <title>
          {t('head.lineItemDetails.title', { titlePostFix: t('campaignManagementSystem') })}
        </title>
        <meta name="description" content={t('head.lineItemDetails.description')} />
      </Helmet>
      <div>
        <Breadcrumb isLoading={isLoading} list={breadcrumbList} />
        <Title>{data?.name || <Skeleton className="h-6" />}</Title>
        <div className="grid w-full mt-2 grid-cols-1 sm:grid-cols-8">
          <div className="sm:col-span-5">
            <h2 className="text-lg mt-2">{t('invoices')}</h2>
            <Table
              columns={invoiceColumns}
              data={data?.invoices || []}
              isFetching={isFetching}
              isLoading={isLoading}
              paginationState={paginationState}
              onRowClick={(row) => {
                navigate(`${routes.invoices}/${row.original.id}`);
              }}
              goTopOnPaging={false}
              manualPagination={false}
            />
          </div>
          <div className="sm:col-span-3 flex flex-col">
            <SingleAmountComparisonChart
              actualAmount={data?.actualAmount}
              bookedAmount={data?.bookedAmount}
            />
            <div className="text-center text-xs">{t('amount')}</div>
          </div>
        </div>
      </div>
    </>
  );
};
