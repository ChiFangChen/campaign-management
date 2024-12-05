import { useNavigate, Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { styled } from 'styled-components';
import { formatAmount } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Table,
} from '@/components';
import { routes } from '@/routes';

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
    accessorFn: ({ actualAmount }) => formatAmount(actualAmount),
    header: 'Amount',
  },
];

type CampaignCardProps = {
  campaign: InvoiceDetailCampaign;
  isFetching: boolean;
  isLoading: boolean;
};

export const CampaignCard = ({ campaign, isFetching, isLoading }: CampaignCardProps) => {
  const navigate = useNavigate();

  return (
    <Card key={campaign.id}>
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
      <StyledCardContent className="border-y p-0">
        <Table
          columns={columns}
          data={campaign.lineItems}
          isFetching={isFetching}
          isLoading={isLoading}
          onRowClick={(row) => {
            navigate(`${routes.lineItems}/${row.original.id}`);
          }}
          isBordered={false}
        />
      </StyledCardContent>
      <CardFooter className="justify-end pt-4">
        <span className="mr-2 text-gray-700 text-sm">Total</span>{' '}
        <span className="text-lg text-black">{formatAmount(campaign.totalAmount)}</span>
      </CardFooter>
    </Card>
  );
};
