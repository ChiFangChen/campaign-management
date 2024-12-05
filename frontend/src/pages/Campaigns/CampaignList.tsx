import { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes';
import { formatAmount } from '@/lib/utils';
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
    accessorFn: ({ bookedTotalAmount }) => formatAmount(bookedTotalAmount),
    header: 'Booked Amount',
  },
  {
    accessorFn: ({ actualTotalAmount }) => formatAmount(actualTotalAmount),
    header: 'Actual Amount',
  },
  {
    accessorKey: 'invoicesCount',
    header: 'Invoice Count',
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
