import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';

import { routes } from '@/routes';
import { readableTime } from '@/lib/formatter-utils';
import { useCampaignDetail } from '@/queries/campaigns';
import { usePagination } from '@/hooks';
import {
  Breadcrumb,
  Title,
  Table,
  AmountTableCell,
  Tooltip,
  TabbedAmountComparisonChart,
  Button,
  Skeleton,
} from '@/components';
import { TableRow, TableCell } from '@/components/ui/table';

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
  const { totalBookedAmount, totalActualAmount, filteredLineItemData } = useMemo(() => {
    const filteredLineItemData = data?.lineItems || [];
    const totalBookedAmount = filteredLineItemData.reduce(
      (acc, item) => acc + item.bookedAmount,
      0
    );
    const totalActualAmount = filteredLineItemData.reduce(
      (acc, item) => acc + item.actualAmount,
      0
    );
    return { totalBookedAmount, totalActualAmount, filteredLineItemData };
  }, [data]);

  const lineItemColumns: ColumnDef<CampaignDetailLineItem>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'bookedAmount',
      header: 'Booked Amount',
      meta: {
        type: 'currency',
      },
    },
    {
      accessorKey: 'actualAmount',
      header: 'Actual Amount',
      meta: {
        type: 'currency',
      },
    },
    {
      header: 'Invoices',
      cell: ({
        row: {
          original: { invoices },
        },
      }) => (
        <div className="flex gap-1 justify-end">
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
      meta: {
        className: 'text-right',
      },
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
          data={filteredLineItemData}
          isFetching={isFetching}
          isLoading={isLoading}
          paginationState={paginationState}
          onRowClick={(row) => {
            navigate(`${routes.lineItems}/${row.original.id}`);
          }}
          goTopOnPaging={false}
          manualPagination={false}
          footer={
            <TableRow>
              <TableCell>Total</TableCell>
              <AmountTableCell amount={totalBookedAmount} />
              <AmountTableCell amount={totalActualAmount} />
              <TableCell />
            </TableRow>
          }
        />
      </div>
    </div>
  );
};
