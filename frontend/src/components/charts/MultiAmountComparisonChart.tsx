import { Bar, BarChart } from 'recharts';

import { chartConfig } from '@/constants';
import { formatAmount } from '@/lib/formatter-utils';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

type MultiAmountComparisonChartProps = {
  data?: CampaignDetailLineItem[];
};
export const MultiAmountComparisonChart = ({ data }: MultiAmountComparisonChartProps) => {
  const chartData = data?.map((lineItem) => ({
    name: lineItem.name,
    booked: lineItem.bookedAmount,
    actual: lineItem.actualAmount,
  }));
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full mt-8">
      <BarChart accessibilityLayer data={chartData}>
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value, payload) => {
                const dataIndex = payload?.[0]?.payload;
                return dataIndex?.name || value;
              }}
              valueFormatter={(value) => formatAmount(value as number)}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="booked" fill="var(--color-booked)" radius={4} />
        <Bar dataKey="actual" fill="var(--color-actual)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
