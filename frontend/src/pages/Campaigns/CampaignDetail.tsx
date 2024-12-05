import { useParams, useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';

import { routes } from '@/routes';
import { readableTime, formatAmount } from '@/lib/formatter-utils';
import { useCampaignDetail } from '@/queries/campaigns';
import { usePagination } from '@/hooks';
import {
  Breadcrumb,
  Title,
  Table,
  Tooltip,
  TabbedAmountComparisonChart,
  Button,
  Skeleton,
} from '@/components';

const breadcrumbList = [
  {
    name: 'Campaigns',
    url: routes.campaigns,
  },
];

export const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useCampaignDetail(id as string);
  const paginationState = usePagination();

  const lineItemColumns: ColumnDef<CampaignDetailLineItem>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorFn: ({ bookedAmount }) => formatAmount(bookedAmount),
      header: 'Booked Amount',
    },
    {
      accessorFn: ({ actualAmount }) => formatAmount(actualAmount),
      header: 'Actual Amount',
    },
    {
      header: 'Invoices',
      cell: ({
        row: {
          original: { invoices },
        },
      }) => (
        <div className="flex gap-1">
          {invoices?.map((invoice) => (
            <Tooltip
              key={invoice.id}
              content={
                <>
                  <div>Created: {readableTime(invoice.createdAt)}</div>
                  <div>Last Updated: {readableTime(invoice.updatedAt)}</div>
                </>
              }
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`${routes.invoices}/${invoice.id}`);
                }}
                size="sm"
                variant="ghost"
                className="h-auto hover:bg-gray-200"
              >
                View
              </Button>
            </Tooltip>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb isLoading={isLoading} list={breadcrumbList} />
      <Title>{data?.name || <Skeleton className="h-6" />}</Title>
      <TabbedAmountComparisonChart isLoading={isLoading} lineItems={data?.lineItems || []} />
      <div>
        <h2 className="text-lg mt-2">Line Items</h2>
        <Table
          columns={lineItemColumns}
          data={data?.lineItems || []}
          isFetching={isFetching}
          isLoading={isLoading}
          paginationState={paginationState}
          onRowClick={(row) => {
            navigate(`${routes.lineItems}/${row.original.id}`);
          }}
          goTopOnPaging={false}
          manualPagination={false}
        />
      </div>
    </div>
  );
};
