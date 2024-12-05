import { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/routes';
import { readableTime, formatAmount } from '@/lib/formatter-utils';
import { usePagination } from '@/hooks';
import { useInvoices } from '@/queries/invoices';
import { Title, Table } from '@/components';

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorFn: ({ createdAt }) => readableTime(createdAt),
    header: 'Created At',
  },
  {
    accessorFn: ({ updatedAt }) => readableTime(updatedAt),
    header: 'Last Updated At',
  },
  {
    accessorFn: ({ totalAmount }) => formatAmount(totalAmount),
    header: 'Total Amount',
  },
];

export const InvoiceList = () => {
  const navigate = useNavigate();
  const paginationState = usePagination();
  const { data, isLoading, isFetching } = useInvoices(paginationState.pagination);

  return (
    <div>
      <Title>Invoices</Title>
      <Table
        columns={columns}
        data={data?.data}
        paginationData={data?.pagination}
        isFetching={isFetching}
        isLoading={isLoading}
        paginationState={paginationState}
        onRowClick={(row) => {
          navigate(`${routes.invoices}/${row.original.id}`);
        }}
      />
    </div>
  );
};
