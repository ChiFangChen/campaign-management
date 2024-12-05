import { FileInput } from 'lucide-react';
import { flattenDataToTable, exportToCSV } from '@/lib/file-utils';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components';

type ExportButtonProps = {
  data?: InvoiceDetail;
};

export const ExportButton = ({ data }: ExportButtonProps) => {
  if (!data) return null;

  const onDownloadClick = () => {
    const flattenedTable = flattenDataToTable(data);
    exportToCSV(data.id, flattenedTable);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-2" size="icon" variant="secondary">
          <FileInput />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Export as</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={onDownloadClick}>
          CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
