function getFormattedDateTimeForFilename() {
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
  const table: FlattenDataTable = [];

  data.campaigns.forEach((campaign) => {
    campaign.lineItems.forEach((item) => {
      table.push({
        'Invoice ID': data.id,
        Adjustments: data.adjustments,
        'Invoice Total Amount': data.adjustments + data.totalActualAmount,
        'Campaign ID': campaign.id,
        'Campaign Name': campaign.name,
        'Line Item ID': item.name,
        'Line Item Name': item.name,
        'Line Item Actual Amount': item.actualAmount,
      });
    });
  });

  return table;
}

export function exportToCSV(id: number, data: FlattenDataTable) {
  const filename = `invoice-${id}-${getFormattedDateTimeForFilename()}.csv`;
  const csvHeaders = Object.keys(data[0]).join(',');
  const csvRows = data.map((row) => Object.values(row).join(','));
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
