import { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes';
import { useCampaigns } from '@/queries/campaigns';
import { usePagination } from '@/hooks';
import { Title, Table } from '@/components';

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
    meta: {
      type: 'currency',
    },
  },
  {
    accessorKey: 'actualTotalAmount',
    header: 'Actual Amount',
    meta: {
      type: 'currency',
    },
  },
  {
    accessorKey: 'invoicesCount',
    header: 'Invoice Count',
    meta: {
      className: 'text-right',
    },
  },
];

export const CampaignList = () => {
  const navigate = useNavigate();
  const paginationState = usePagination();
  const { data, isLoading, isFetching } = useCampaigns(paginationState.pagination);

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
