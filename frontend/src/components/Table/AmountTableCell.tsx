import { formatAmount } from '@/lib/formatter-utils';
import { cn } from '@/lib/utils';
import { TableCell } from '@/components/ui/table';

type AmountTableCellProps = {
  amount: number;
  className?: string;
};

export const AmountTableCell = ({ amount, className }: AmountTableCellProps) => {
  return (
    <TableCell className={cn('text-right font-mono', className || '')}>
      {formatAmount(amount)}
    </TableCell>
  );
};
