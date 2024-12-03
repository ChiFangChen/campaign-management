import { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '@/queries/campaigns';
import { Title, Table } from '@/components';
import { usePagination } from '@/hooks';
import { routes } from '@/routes';

export const CampaignList = () => {
  const navigate = useNavigate();
  const paginationState = usePagination();
  const { data, isLoading, isFetching } = useCampaigns(paginationState.pagination);

  console.log(data);
  const columns: ColumnDef<Campaign>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'lineItemsCount',
      header: 'Line Item Count',
    },
    {
      accessorKey: 'bookedTotalAmount',
      header: 'Booked Amount',
    },
    {
      accessorKey: 'actualTotalAmount',
      header: 'Actual Amount',
    },
    {
      accessorKey: 'invoicesCount',
      header: 'Invoice Count',
    },
  ];
  return (
    <div>
      <Title>Campaigns</Title>
      <Table
        columns={columns}
        data={data?.data}
        paginationData={data?.pagination}
        isFetching={isFetching}
        isLoading={isLoading}
        paginationState={paginationState}
        onRowClick={(row) => {
          navigate(`${routes.campaigns}/${row.original.id}`);
        }}
      />
    </div>
  );
};
