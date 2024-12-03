import { useParams, useNavigate } from 'react-router-dom';
import { CellContext } from '@tanstack/react-table';
import { useCampaignDetail } from '@/queries/campaigns';
import { Title, Table, Tooltip } from '@/components';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { usePagination } from '@/hooks';
import { routes } from '@/routes';
import { readableDate } from '@/lib/utils';

export const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useCampaignDetail(id as string);
  const paginationState = usePagination();

  console.log('data', data);

  const lineItemColumns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'bookedAmount',
      header: 'Booked Amount',
    },
    {
      accessorKey: 'actualAmount',
      header: 'Actual Amount',
    },
    {
      header: 'Invoices',
      cell: ({
        row: {
          original: { invoices },
        },
      }: CellContext<CampaignDetailLineItem, string>) => {
        console.log('getValue', invoices);
        return (
          <div className="flex gap-1">
            {invoices?.map((invoice) => (
              <Tooltip
                key={invoice.id}
                content={
                  <>
                    <div>Created: {readableDate(invoice.createdAt)}</div>
                    <div>Last Updated: {readableDate(invoice.updatedAt)}</div>
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
        );
      },
    },
  ];

  // const invoiceColumns = [
  //   {
  //     accessorKey: 'name',
  //     header: 'Name',
  //   },
  //   {
  //     accessorKey: 'bookedAmount',
  //     header: 'Booked Amount',
  //   },
  //   {
  //     accessorKey: 'actualAmount',
  //     header: 'Actual Amount',
  //   },
  //   {
  //     header: 'Invoice',
  //     columns: [
  //       {
  //         accessorKey: 'invoice.adjustments',
  //         header: 'Adjustments',
  //       },
  //       {
  //         accessorKey: 'invoice',
  //         header: 'Total',
  //         cell: ({ row, table, getValue }: CellContext<CampaignDetail, string>) => {
  //           const invoice = getValue();
  //           if (!invoice) return null;

  //           const rowIndex = row.index;
  //           const previousRow = table.getRowModel().rows[rowIndex - 1];
  //           const shouldMerge = previousRow && previousRow.original.invoice?.id === invoice?.id;

  //           return shouldMerge ? null : getValue();
  //         },
  //       },
  //       {
  //         accessorKey: 'id',
  //         header: null,
  //       },
  //     ],
  //   },
  // ];

  return (
    <div>
      <Title>{data?.name || <Skeleton className="h-6" />}</Title>
      <div>
        <h1 className="text-md mt-6">Line Items</h1>
        <Table
          columns={lineItemColumns}
          data={data?.lineItems || []}
          isFetching={isFetching}
          isLoading={isLoading}
          paginationState={paginationState}
          onRowClick={(row) => {
            navigate(`${routes.inlineItems}/${row.original.id}`);
          }}
          goTopOnPaging={false}
          manualPagination={false}
        />
      </div>
    </div>
  );
};
