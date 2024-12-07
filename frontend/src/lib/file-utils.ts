import i18n from 'i18next';
import * as XLSX from 'xlsx';

export function getFormattedDateTimeForFilename() {
  const formatter = new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const now = new Date();
  const parts = formatter.formatToParts(now);

  const dateTime = parts
    .map((part) => {
      if (part.type === 'literal') return '';
      return part.value;
    })
    .join('');

  return dateTime.replace(/[\s:/]/g, '-');
}

type FlattenDataTable = { [key: string]: number | string }[];

export function flattenDataToTable(data: InvoiceDetail) {
  const { t } = i18n;
  const table: FlattenDataTable = [];

  data.campaigns.forEach((campaign) => {
    campaign.lineItems.forEach((item) => {
      table.push({
        [t('export.invoiceId')]: data.id,
        [t('export.adjustments')]: data.adjustments,
        [t('export.invoiceTotalAmount')]: Number(
          (data.adjustments + data.totalActualAmount).toFixed(2)
        ),
        [t('export.campaignId')]: campaign.id,
        [t('export.campaignName')]: campaign.name,
        [t('export.lineItemId')]: item.id,
        [t('export.lineItemName')]: item.name,
        [t('export.lineItemActualAmount')]: item.actualAmount,
      });
    });
  });

  return table;
}

export function exportToXLS(name: string, data: FlattenDataTable) {
  const filename = `${name}.xlsx`;
  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  XLSX.writeFile(workbook, filename);
}

function escapeCSVValue(value: string | number) {
  if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportToCSV(name: string, data: FlattenDataTable) {
  const filename = `${name}.csv`;
  const csvHeaders = Object.keys(data[0]).join(',');
  const csvRows = data.map((row) => Object.values(row).map(escapeCSVValue).join(','));
  const csvContent = [csvHeaders, ...csvRows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
