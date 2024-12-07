import { useTranslation } from 'react-i18next';
import { FileInput } from 'lucide-react';

import {
  flattenDataToTable,
  getFormattedDateTimeForFilename,
  exportToCSV,
  exportToXLS,
} from '@/lib/file-utils';
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
  const { t } = useTranslation();

  const onDownloadClick = (type: ExportFileType) => () => {
    const flattenedTable = flattenDataToTable(data);
    const filename = `${t('export.invoice')}-${data.id}-${getFormattedDateTimeForFilename()}.xlsx`;
    if (type === 'csv') {
      exportToCSV(filename, flattenedTable);
      return;
    }
    exportToXLS(filename, flattenedTable);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-2" size="icon" variant="secondary">
          <FileInput />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t('exportAs')}</DropdownMenuLabel>
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
