import { useNavigate, Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { styled } from 'styled-components';

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

const columns: ColumnDef<InvoiceDetailCampaignLineItem>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'actualAmount',
    header: 'Amount',
    meta: {
      type: 'currency',
    },
  },
];

type CampaignCardProps = {
  campaign: InvoiceDetailCampaign;
};

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardDescription className="flex justify-between mb-1">
          <span>Campaign</span>
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
              <TableCell colSpan={2} className="bg-white">
                Total
              </TableCell>
              <AmountTableCell amount={campaign.totalAmount} className="bg-white" />
            </TableRow>
          }
        />
      </StyledCardContent>
    </Card>
  );
};
