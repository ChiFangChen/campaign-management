import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatAmount } from '@/lib/formatter-utils';
import { cn } from '@/lib/utils';
import { Skeleton, Card } from '@/components';
import { AmountPopover, AmountPopoverType } from './AmountPopover';

type AmountCardProps = {
  type: 'actual' | 'adjustments' | 'final';
  data?: InvoiceDetails;
};

export const AmountCard = ({ type, data }: AmountCardProps) => {
  const { t } = useTranslation();
  const isEditable = ['adjustments', 'final'].includes(type);
  const { name, amount } = useMemo(() => {
    switch (type) {
      case 'adjustments':
        return { name: t('adjustments'), amount: data?.adjustments };
      case 'final':
        return {
          name: t('finalTotalAmount'),
          amount: data && data.totalActualAmount + data.adjustments,
        };
      case 'actual':
      default:
        return { name: t('actualTotalAmount'), amount: data?.totalActualAmount };
    }
  }, [type, data, t]);

  return (
    <Card className="min:w-1/5 p-4 relative group">
      <div className="pb-0 text-sm text-gray-700 dark:text-gray-500">{name}</div>
      {typeof amount === 'number' ? (
        <>
          <div
            className={cn('text-3xl', type !== 'final' ? 'text-gray-900 dark:text-gray-300' : '')}
          >
            {formatAmount(amount)}
          </div>
          {isEditable && (
            <AmountPopover
              type={type as AmountPopoverType}
              name={name}
              amount={amount}
              totalActualAmount={data?.totalActualAmount || 0}
            />
          )}
        </>
      ) : (
        <Skeleton className="h-8 mt-0.5 w-36" />
      )}
    </Card>
  );
};
