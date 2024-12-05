import { useMemo } from 'react';
import { formatAmount } from '@/lib/utils';
import { Skeleton, Card } from '@/components';
import { AmountPopover, AmountPopoverType } from './AmountPopover';

type AmountCardProps = {
  type: 'actual' | 'adjustments' | 'final';
  data: { totalActualAmount: number; adjustments: number };
};

export const AmountCard = ({ type, data }: AmountCardProps) => {
  const isEditable = ['adjustments', 'final'].includes(type);
  const { name, amount } = useMemo(() => {
    switch (type) {
      case 'adjustments':
        return { name: 'Adjustments', amount: data?.adjustments };
      case 'final':
        return {
          name: 'Final Total Amount',
          amount: data && data.totalActualAmount + data.adjustments,
        };
      case 'actual':
      default:
        return { name: 'Actual Total', amount: data?.totalActualAmount };
    }
  }, [type, data]);

  return (
    <Card className="min:w-1/5 p-4 relative group">
      <div className="pb-0 text-sm text-gray-700">{name}</div>
      {typeof amount === 'number' ? (
        <>
          <div className={`text-3xl${type !== 'final' ? ' text-gray-900' : ''}`}>
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
        <div className="text-3xl">
          <Skeleton className="h-6" />
        </div>
      )}
    </Card>
  );
};
