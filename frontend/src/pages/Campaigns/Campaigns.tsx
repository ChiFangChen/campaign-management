import { ColumnDef } from '@tanstack/react-table';
import { useCampaigns } from '@/queries/campaigns';
import { Title, Table } from '@/components';
import { usePagination } from '@/hooks';

export const Campaigns = () => {
  const paginationState = usePagination();
  const { data, isLoading, isFetching } = useCampaigns({
    page: paginationState.pagination.pageIndex,
    per_page: paginationState.pagination.pageSize,
  });

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
