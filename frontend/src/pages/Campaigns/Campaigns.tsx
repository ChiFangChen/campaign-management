import { ColumnDef } from '@tanstack/react-table';
import { useCampaigns } from '@/queries/campaigns';
import { Title, Table } from '@/components';

export const Campaigns = () => {
  const { data, isLoading, isFetching } = useCampaigns();
  console.log(data);
  const columns: ColumnDef<Campaign>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'line_items_count',
      header: 'Line Item Count',
    },
    {
      accessorKey: 'booked_total_amount',
      header: 'Booked Amount',
    },
    {
      accessorKey: 'actual_total_amount',
      header: 'Actual Amount',
    },
    {
      accessorKey: 'invoices_count',
      header: 'Invoice Count',
    },
  ];
  return (
    <div>
      <Title>Campaigns</Title>
      <div className="container mx-auto py-10">
        <Table columns={columns} data={data} isFetching={isFetching} isLoading={isLoading} />
      </div>
    </div>
  );
};
