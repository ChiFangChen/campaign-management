import { FileInput } from 'lucide-react';
import { flattenDataToTable, exportToCSV, exportToXLS } from '@/lib/file-utils';
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
  data: InvoiceDetail;
};

type ExportFileType = 'csv' | 'xls';

const exportFileTypes: {
  label: string;
  type: ExportFileType;
}[] = [
  { label: 'CSV', type: 'csv' },
  { label: 'XLS', type: 'xls' },
];

export const ExportButton = ({ data }: ExportButtonProps) => {
  const onDownloadClick = (type: ExportFileType) => () => {
    const flattenedTable = flattenDataToTable(data);
    if (type === 'csv') {
      exportToCSV(data.id, flattenedTable);
      return;
    }
    exportToXLS(data.id, flattenedTable);
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
        {exportFileTypes.map(({ label, type }) => (
          <DropdownMenuItem key={type} className="cursor-pointer" onClick={onDownloadClick(type)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
