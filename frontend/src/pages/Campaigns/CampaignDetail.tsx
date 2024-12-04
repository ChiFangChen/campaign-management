import { useParams, useNavigate } from 'react-router-dom';
import { CellContext } from '@tanstack/react-table';
import { useCampaignDetail } from '@/queries/campaigns';
import {
  Breadcrumb,
  Title,
  Table,
  Tooltip,
  TabbedAmountComparisonChart,
  Button,
  Skeleton,
} from '@/components';
import { usePagination } from '@/hooks';
import { routes } from '@/routes';
import { readableDate } from '@/lib/utils';

const breadcrumbList = [
  {
    name: 'Campaigns',
    url: routes.campaigns,
  },
];

export const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useCampaignDetail(id as string);
  const paginationState = usePagination();

  console.log('data', data);

  const lineItemColumns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'bookedAmount',
      header: 'Booked Amount',
    },
    {
      accessorKey: 'actualAmount',
      header: 'Actual Amount',
    },
    {
      header: 'Invoices',
      cell: ({
        row: {
          original: { invoices },
        },
      }: CellContext<CampaignDetailLineItem, string>) => {
        console.log('getValue', invoices);
        return (
          <div className="flex gap-1">
            {invoices?.map((invoice) => (
              <Tooltip
                key={invoice.id}
                content={
                  <>
                    <div>Created: {readableDate(invoice.createdAt)}</div>
                    <div>Last Updated: {readableDate(invoice.updatedAt)}</div>
                  </>
                }
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`${routes.invoices}/${invoice.id}`);
                  }}
                  size="sm"
                  variant="ghost"
                  className="h-auto hover:bg-gray-200"
                >
                  View
                </Button>
              </Tooltip>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Breadcrumb isLoading={isLoading} list={breadcrumbList} />
      <Title>{data?.name || <Skeleton className="h-6" />}</Title>
      <TabbedAmountComparisonChart isLoading={isLoading} lineItems={data?.lineItems || []} />
      <div>
        <h2 className="text-lg mt-2">Line Items</h2>
        <Table
          columns={lineItemColumns}
          data={data?.lineItems || []}
          isFetching={isFetching}
          isLoading={isLoading}
          paginationState={paginationState}
          onRowClick={(row) => {
            navigate(`${routes.lineItems}/${row.original.id}`);
          }}
          goTopOnPaging={false}
          manualPagination={false}
        />
      </div>
    </div>
  );
};
