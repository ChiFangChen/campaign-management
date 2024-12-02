import { ColumnDef } from '@tanstack/react-table';
import { useLineItems } from '@/queries/line-items';
import { Title, Table } from '@/components';

export const LineItems = () => {
  const { data, isLoading, isFetching } = useLineItems();
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
      <div className="container mx-auto py-10">
        <Table columns={columns} data={data} isFetching={isFetching} isLoading={isLoading} />
      </div>
    </div>
  );
};
