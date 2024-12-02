import { TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCell = () => (
  <TableCell>
    <Skeleton className="h-4" />
  </TableCell>
);
