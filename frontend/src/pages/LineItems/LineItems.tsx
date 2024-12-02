import { ColumnDef } from '@tanstack/react-table';
import { useLineItems } from '@/queries/line-items';
import { Title, Table } from '@/components';
import { usePagination } from '@/hooks';

export const LineItems = () => {
  const paginationState = usePagination();
  const { data, isLoading, isFetching } = useLineItems({ page: 1, per_page: 10 });
  console.log(data);
  const columns: ColumnDef<LineItem>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'campaign.name',
      header: 'Campaign',
    },
    {
      accessorKey: 'booked_amount',
      header: 'Booked Amount',
    },
    {
      accessorKey: 'actual_amount',
      header: 'Actual Amount',
    },
    {
      accessorKey: 'invoices_count',
      header: 'Invoice Count',
    },
  ];
  return (
    <div>
      <Title>Line Items</Title>
      <Table
        columns={columns}
        data={data}
        isFetching={isFetching}
        isLoading={isLoading}
        paginationState={paginationState}
      />
    </div>
  );
};
