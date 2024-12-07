import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Table,
  Skeleton,
} from '@/components';
import { TableRow, TableCell } from '@/components/ui/table';

const StyledCardContent = styled(CardContent)`
  > div {
    margin: 0;
  }
  th:first-child,
  td:first-child {
    padding-left: 1.5rem;
  }
  th:last-child,
  td:last-child {
    padding-right: 1.5rem;
  }
`;

export const SkeletonCampaignCard = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<InvoiceDetailsCampaignLineItem>[] = [
    {
      accessorKey: 'id',
      header: t('id'),
    },
    {
      accessorKey: 'name',
      header: t('name'),
    },
    {
      accessorKey: 'actualAmount',
      header: t('amount'),
      meta: {
        type: 'currency',
      },
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardDescription className="flex justify-between mb-1">
          <span>{t('campaign')}</span>
          <span>
            <Skeleton className="h-3 w-8" />
          </span>
        </CardDescription>
        <CardTitle>
          <Skeleton className="h-5 w-64" />
        </CardTitle>
      </CardHeader>
      <StyledCardContent className="border-y p-0 pb-4">
        <Table
          columns={columns}
          data={[]}
          isLoading
          isBordered={false}
          footer={
            <TableRow>
              <TableCell colSpan={2} className="bg-white dark:bg-background">
                {t('total')}
              </TableCell>
              <TableCell className="bg-white dark:bg-background">
                <Skeleton className="h-3 w-full" />
              </TableCell>
            </TableRow>
          }
        />
      </StyledCardContent>
    </Card>
  );
};
