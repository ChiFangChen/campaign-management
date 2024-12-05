import { useParams, useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';

import { routes } from '@/routes';
import { readableDate } from '@/lib/utils';
import { usePagination } from '@/hooks';
import { useLineItemDetail } from '@/queries/line-items';
import { Breadcrumb, Title, Table, SingleAmountComparisonChart, Skeleton } from '@/components';

export const LineItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useLineItemDetail(id as string);
  const paginationState = usePagination();

  const invoiceColumns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorFn: ({ createdAt }) => readableDate(createdAt),
      header: 'Created At',
    },
    {
      accessorFn: ({ updatedAt }) => readableDate(updatedAt),
      header: 'Last Updated At',
    },
  ];

  const breadcrumbList = [
    {
      name: 'Campaigns',
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

  return (
    <div>
      <Breadcrumb isLoading={isLoading} list={breadcrumbList} />
      <Title>{data?.name || <Skeleton className="h-6" />}</Title>
      <div className="grid w-full mt-2 grid-cols-1 sm:grid-cols-8">
        <div className="sm:col-span-5">
          <h2 className="text-lg mt-2">Invoices</h2>
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
          <div className="text-center text-xs">Amount</div>
        </div>
      </div>
    </div>
  );
};
