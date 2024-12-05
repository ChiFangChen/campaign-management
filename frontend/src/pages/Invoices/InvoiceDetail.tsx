import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import styled from 'styled-components';

import { routes } from '@/routes';
import { readableTime } from '@/lib/formatter-utils';
import { useInvoiceDetail } from '@/queries/invoices';
import { Breadcrumb, Title, Skeleton } from '@/components';
import { AmountCard } from './AmountCard';
import { CampaignCard, SkeletonCampaignCard } from './CampaignCard';
import { ExportButton } from './ExportButton';

const ScrollArea = styled.div`
  margin-right: -14px;
  padding-right: 14px;
`;

const breadcrumbList = [
  {
    name: 'Invoices',
    url: routes.invoices,
  },
];

export const InvoiceDetail = () => {
  const { id } = useParams();
  const listRef = useRef<HTMLDivElement | null>(null);
  const { data } = useInvoiceDetail(id as string);

  const rowVirtualizer = useVirtualizer({
    count: data?.campaigns.length || 0,
    getScrollElement: () => listRef.current,
    estimateSize: () => 235,
    measureElement: (el: HTMLDivElement) => el.offsetHeight,
  });

  return (
    <div className="flex flex-col pt-4" style={{ height: `calc(100vh - 1rem)` }}>
      <Breadcrumb list={breadcrumbList} />
      <div className="flex justify-between">
        {data ? (
          <>
            <Title>
              {data.id}
              <ExportButton data={data} />
            </Title>
            <div className="text-xs text-gray-500 text-right">
              <div>Created: {readableTime(data.createdAt)}</div>
              <div>Last Updated: {readableTime(data.updatedAt)}</div>
            </div>
          </>
        ) : (
          <>
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-48" />
          </>
        )}
      </div>

      <div className="mt-4 mb-6 flex justify-center gap-2 items-center">
        <AmountCard type="actual" data={data} />
        <div>+</div>
        <AmountCard type="adjustments" data={data} />
        <div>=</div>
        <AmountCard type="final" data={data} />
      </div>

      <ScrollArea ref={listRef} className="flex-1 overflow-auto">
        <div
          className="relative flex flex-col gap-4 mx-2.5"
          style={{
            height: rowVirtualizer.getTotalSize(),
          }}
        >
          {data?.campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          )) || <SkeletonCampaignCard />}
        </div>
      </ScrollArea>
    </div>
  );
};
