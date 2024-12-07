import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { ColumnDef } from '@tanstack/react-table';

import { routes } from '@/routes';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Table,
  AmountTableCell,
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

type CampaignCardProps = {
  campaign: InvoiceDetailsCampaign;
};

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const navigate = useNavigate();
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
          <span>{campaign.id}</span>
        </CardDescription>
        <CardTitle>
          <Link to={`${routes.lineItems}/${campaign.id}`} className="hover:text-gray-700">
            {campaign.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <StyledCardContent className="border-y p-0 pb-4">
        <Table
          columns={columns}
          data={campaign.lineItems}
          onRowClick={(row) => {
            navigate(`${routes.lineItems}/${row.original.id}`);
          }}
          isBordered={false}
          footer={
            <TableRow>
              <TableCell colSpan={2} className="bg-white dark:bg-background">
                {t('total')}
              </TableCell>
              <AmountTableCell
                amount={campaign.totalAmount}
                className="bg-white dark:bg-background"
              />
            </TableRow>
          }
        />
      </StyledCardContent>
    </Card>
  );
};
