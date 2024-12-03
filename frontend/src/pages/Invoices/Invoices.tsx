import { ColumnDef } from '@tanstack/react-table';
import { useInvoices } from '@/queries/invoices';
import { Title, Table } from '@/components';
import { usePagination } from '@/hooks';
import { readableDate } from '@/lib/utils';

export const Invoices = () => {
  const paginationState = usePagination();
  const { data, isLoading, isFetching } = useInvoices(paginationState.pagination);
  console.log(data);
  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorFn: ({ createdAt }) => readableDate(createdAt),
      header: 'Created At',
    },
    {
      accessorFn: ({ updatedAt }) => readableDate(updatedAt),
      header: 'Last Updated At',
    },
    {
      accessorKey: 'totalAmount',
      header: 'Total Amount',
    },
  ];

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
      />
    </div>
  );
};
