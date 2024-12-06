import { ReactNode } from 'react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, Skeleton } from '@/components';

type DataCardProps = {
  title: string;
  description?: string;
  data?: ReactNode;
  isLoading?: boolean;
};

export const DataCard = ({ title, description, data, isLoading = false }: DataCardProps) => (
  <Card className="w-fit flex-1">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent className="text-4xl font-bold">
      {isLoading ? <Skeleton className="h-9" /> : data}
    </CardContent>
  </Card>
);
