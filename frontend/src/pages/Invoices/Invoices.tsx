import { ColumnDef } from '@tanstack/react-table';
import { useInvoices } from '@/queries/invoices';
import { Title, Table } from '@/components';

export const Invoices = () => {
  const { data, isLoading, isFetching } = useInvoices();
  console.log(data);
  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'campaign.name',
      header: 'Campaign Name',
    },
    {
      accessorKey: 'line_items',
      header: 'Line Items',
      cell: ({ getValue }) => {
        const value = getValue() as LineItem[];
        return value.map((v) => <div key={v.id}>{v.name}</div>);
      },
    },
    {
      accessorKey: 'total_amount',
      header: 'Total Amount',
    },
  ];
  return (
    <div>
      <Title>Invoices</Title>
      <div className="container mx-auto py-10">
        <Table columns={columns} data={data} isFetching={isFetching} isLoading={isLoading} />
      </div>
    </div>
  );
};
