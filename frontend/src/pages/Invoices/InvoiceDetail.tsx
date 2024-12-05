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
        <AmountCard type="actual" data={data} />
        <div>+</div>
        <AmountCard type="adjustments" data={data} />
        <div>=</div>
        <AmountCard type="final" data={data} />
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
