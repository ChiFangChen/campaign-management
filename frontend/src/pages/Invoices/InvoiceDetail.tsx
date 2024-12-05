import { useParams } from 'react-router-dom';
import { useInvoiceDetail } from '@/queries/invoices';
import { Breadcrumb, Title, Skeleton } from '@/components';
import { routes } from '@/routes';
import { readableDate } from '@/lib/utils';
import { AmountCard } from './AmountCard';
import { CampaignCard } from './CampaignCard';

const breadcrumbList = [
  {
    name: 'Invoices',
    url: routes.invoices,
  },
];

export const InvoiceDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useInvoiceDetail(id as string);
  const totalAmount = data ? data.totalActualAmount + data.adjustments : 0;
  console.log('data', data);

  return (
    <div>
      <Breadcrumb list={breadcrumbList} />
      <div className="flex justify-between">
        <Title>{data?.id || <Skeleton className="h-6 w-32" />}</Title>
        {data && (
          <div className="text-xs text-gray-500 text-right">
            <div>Created: {readableDate(data.createdAt)}</div>
            <div>Last Updated: {readableDate(data.updatedAt)}</div>
          </div>
        )}
      </div>

      <div className="my-4 flex justify-center gap-2 items-center">
        <AmountCard name="Actual Total" amount={data?.totalActualAmount} />
        <div>+</div>
        <AmountCard name="Adjustments" amount={data?.adjustments} />
        <div>=</div>
        <AmountCard name="Final Total Amount" amount={data && totalAmount} />
      </div>

      <div>
        {data?.campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};
