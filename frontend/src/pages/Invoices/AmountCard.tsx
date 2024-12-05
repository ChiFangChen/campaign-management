import { Skeleton, Card } from '@/components';

type AmountCardProps = { name: string; amount?: number };

export const AmountCard = ({ name, amount }: AmountCardProps) => (
  <Card className="min:w-1/5 p-4">
    <div className="pb-0 text-sm text-gray-700">{name}</div>
    <div className="text-3xl">
      {typeof amount === 'number' ? amount : <Skeleton className="h-6" />}
    </div>
  </Card>
);
