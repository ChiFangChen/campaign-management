import { useParams, useNavigate } from 'react-router-dom';
import { ColumnDef, Row } from '@tanstack/react-table';

import { routes } from '@/routes';
import { readableTime } from '@/lib/formatter-utils';
import { useCampaignDetail } from '@/queries/campaigns';
import { usePagination, useTableFilters, useTableSorting } from '@/hooks';
import {
  Breadcrumb,
  Title,
  Table,
  AmountTableCell,
  Tooltip,
  MultiAmountComparisonChart,
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
  const filtersState = useTableFilters();
  const sortingState = useTableSorting();

  const lineItemColumns: ColumnDef<CampaignDetailLineItem>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      meta: { filterId: 'name', sortable: true },
    },
    {
      accessorKey: 'bookedAmount',
      header: 'Booked Amount',
      meta: {
        type: 'currency',
        sortable: true,
      },
    },
    {
      accessorKey: 'actualAmount',
      header: 'Actual Amount',
      meta: {
        type: 'currency',
        sortable: true,
      },
    },
    {
      accessorKey: 'invoices',
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
                  <div>{invoice.id}</div>
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
      sortingFn: (a, b) => {
        const aHasInvoices = (a.original.invoices?.length || 0) > 0 ? 1 : 0;
        const bHasInvoices = (b.original.invoices?.length || 0) > 0 ? 1 : 0;

        return aHasInvoices - bHasInvoices;
      },
      meta: {
        align: 'right',
        sortable: true,
      },
    },
  ];

  const renderFooter = (filteredLineItemData: Row<CampaignDetailLineItem>[]) => {
    const totalBookedAmount = filteredLineItemData.reduce(
      (acc, item) => acc + item.original.bookedAmount,
      0
    );
    const totalActualAmount = filteredLineItemData.reduce(
      (acc, item) => acc + item.original.actualAmount,
      0
    );
    return (
      <TableRow>
        <TableCell>Total</TableCell>
        <AmountTableCell amount={totalBookedAmount} />
        <AmountTableCell amount={totalActualAmount} />
        <TableCell />
      </TableRow>
    );
  };

  return (
    <div>
      <Breadcrumb isLoading={isLoading} list={breadcrumbList} />
      <Title>{data?.name || <Skeleton className="h-6" />}</Title>
      <MultiAmountComparisonChart data={data?.lineItems || []} />
      <div>
        <h2 className="text-lg mt-2">Line Items</h2>
        <Table
          columns={lineItemColumns}
          data={data?.lineItems || []}
          isFetching={isFetching}
          isLoading={isLoading}
          paginationState={paginationState}
          filtersState={filtersState}
          sortingState={sortingState}
          onRowClick={(row) => {
            navigate(`${routes.lineItems}/${row.original.id}`);
          }}
          goTopOnPaging={false}
          manualPagination={false}
          footer={renderFooter}
        />
      </div>
    </div>
  );
};
