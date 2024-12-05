import { XAxis, Cell, Bar, BarChart as UIBarChart } from 'recharts';
import { formatAmount } from '@/lib/formatter-utils';
import { ChartContainer } from '@/components/ui/chart';
import { chartConfig } from '@/constants';

type SingleBarChartProps = {
  bookedAmount?: number;
  actualAmount?: number;
};

export function SingleAmountComparisonChart({
  bookedAmount = 0,
  actualAmount = 0,
}: SingleBarChartProps) {
  const chartData = [
    { name: 'Booked', amount: bookedAmount, color: chartConfig.booked.color },
    { name: 'Actual', amount: actualAmount, color: chartConfig.actual.color },
  ];

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <UIBarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
          left: 20,
          right: 20,
        }}
      >
        <Bar
          dataKey="amount"
          label={{
            position: 'top',
            formatter: (value: number) => formatAmount(value),
          }}
        >
          {chartData.map(({ name, color }) => (
            <Cell key={name} fill={color} />
          ))}
        </Bar>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <XAxis label="Amount" axisLine={false} tickLine={false} />
      </UIBarChart>
    </ChartContainer>
  );
}
