import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ColumnDef, Row } from '@tanstack/react-table';

import { routes } from '@/routes';
import { readableTime } from '@/lib/formatter-utils';
import { useCampaignDetails } from '@/queries/campaigns';
import { usePagination, useTableFilters, useTableSorting } from '@/hooks';
import {
  Breadcrumb,
  Title,
  Table,
  AmountTableCell,
  Tooltip,
  MultiAmountComparisonChart,
  Button,
  Skeleton,
} from '@/components';
import { TableRow, TableCell } from '@/components/ui/table';

export const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, isFetching } = useCampaignDetails(id as string);
  const paginationState = usePagination();
  const filtersState = useTableFilters();
  const sortingState = useTableSorting();

  const breadcrumbList = [
    {
      name: t('campaigns'),
      url: routes.campaigns,
    },
  ];

  const lineItemColumns: ColumnDef<CampaignDetailsLineItem>[] = [
    {
      accessorKey: 'id',
      header: t('id'),
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: t('name'),
      meta: { filterId: 'name', sortable: true },
    },
    {
      accessorKey: 'bookedAmount',
      header: t('bookedAmount'),
      meta: {
        type: 'currency',
        sortable: true,
      },
    },
    {
      accessorKey: 'actualAmount',
      header: t('actualAmount'),
      meta: {
        type: 'currency',
        sortable: true,
      },
    },
    {
      accessorKey: 'invoices',
      header: t('invoices'),
      cell: ({
        row: {
          original: { invoices },
        },
      }) => (
        <div className="flex gap-1 justify-end">
          {invoices?.map((invoice) => (
            <Tooltip
              key={invoice.id}
              content={
                <>
                  <div>{t('ID: {{id}}', { id: invoice.id })}</div>
                  <div>{t('Created: {{time}}', { time: readableTime(invoice.createdAt) })}</div>
                  <div>
                    {t('Last Updated: {{time}}', { time: readableTime(invoice.updatedAt) })}
                  </div>
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
                {t('view')}
              </Button>
            </Tooltip>
          ))}
        </div>
      ),
      sortingFn: (a, b) => {
        const aHasInvoices = (a.original.invoices?.length || 0) > 0 ? 1 : 0;
        const bHasInvoices = (b.original.invoices?.length || 0) > 0 ? 1 : 0;

        return aHasInvoices - bHasInvoices;
      },
      meta: {
        align: 'right',
        sortable: true,
      },
    },
  ];

  const renderFooter = (filteredLineItemData: Row<CampaignDetailsLineItem>[]) => {
    const totalBookedAmount = filteredLineItemData.reduce(
      (acc, item) => acc + item.original.bookedAmount,
      0
    );
    const totalActualAmount = filteredLineItemData.reduce(
      (acc, item) => acc + item.original.actualAmount,
      0
    );
    return (
      <TableRow>
        <TableCell>{t('total')}</TableCell>
        <AmountTableCell amount={totalBookedAmount} />
        <AmountTableCell amount={totalActualAmount} />
        <TableCell />
      </TableRow>
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {t('head.campaignDetails.title', { titlePostFix: t('campaignManagementSystem') })}
        </title>
        <meta name="description" content={t('head.campaignDetails.description')} />
      </Helmet>
      <div>
        <Breadcrumb isLoading={isLoading} list={breadcrumbList} />
        <Title>{data?.name || <Skeleton className="h-6" />}</Title>
        <MultiAmountComparisonChart data={data?.lineItems || []} />
        <div>
          <h2 className="text-lg mt-2">{t('lineItems')}</h2>
          <Table
            columns={lineItemColumns}
            data={data?.lineItems || []}
            isFetching={isFetching}
            isLoading={isLoading}
            paginationState={paginationState}
            filtersState={filtersState}
            sortingState={sortingState}
            onRowClick={(row) => {
              navigate(`${routes.lineItems}/${row.original.id}`);
            }}
            goTopOnPaging={false}
            manualPagination={false}
            footer={renderFooter}
          />
        </div>
      </div>
    </>
  );
};
