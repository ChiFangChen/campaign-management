import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { t } = useTranslation();

  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      role="status"
      aria-label={t('loading')}
      {...props}
    />
  );
}

export { Skeleton };
