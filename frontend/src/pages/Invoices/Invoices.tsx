import { ColumnDef } from '@tanstack/react-table';
import { useInvoices } from '@/queries/invoices';
import { Title, Table } from '@/components';
import { usePagination } from '@/hooks';

export const Invoices = () => {
  const paginationState = usePagination();
  const { data, isLoading, isFetching } = useInvoices(paginationState.pagination);
  console.log(data);
  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'campaign.name',
      header: 'Campaign Name',
    },
    {
      accessorKey: 'lineItems',
      header: 'Line Items',
      cell: ({ getValue }) => {
        const value = getValue() as LineItem[];
        return value.map((v) => <div key={v.id}>{v.name}</div>);
      },
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
        data={data}
        isFetching={isFetching}
        isLoading={isLoading}
        paginationState={paginationState}
      />
    </div>
  );
};
