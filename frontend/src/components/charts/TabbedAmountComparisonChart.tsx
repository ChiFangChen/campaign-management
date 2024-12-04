import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { chartConfig } from '@/constants';

type TotalAmountChartProps = {
  isLoading?: boolean;
  lineItems?: CampaignDetailLineItem[];
};

export function TabbedAmountComparisonChart({ isLoading, lineItems = [] }: TotalAmountChartProps) {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('actual');

  const { total, chartData } = React.useMemo(
    () => ({
      total: {
        actual: lineItems.reduce((acc, curr) => acc + curr.actualAmount, 0),
        booked: lineItems.reduce((acc, curr) => acc + curr.bookedAmount, 0),
      },
      chartData: lineItems.map((item) => ({
        name: item.name,
        actual: item.actualAmount,
        booked: item.bookedAmount,
      })),
    }),
    [lineItems]
  );

  return (
    <div className="container mx-auto mt-5">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-2 p-0 sm:flex-row rounded-sm">
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2">
          <CardTitle>Total Amount</CardTitle>
        </div>
        <div className="flex">
          {['actual', 'booked'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t-2 px-3 py-2 text-left even:border-l-2 data-[active=true]:bg-muted/50 sm:border-l-2 sm:border-t-0"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {isLoading ? (
                    <Skeleton className="h-6 w-24" />
                  ) : (
                    total[key as keyof typeof total].toLocaleString()
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="p-0 mt-2">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tick={false} tickLine={false} axisLine={false} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey={activeChart}
                  labelFormatter={(value, payload) => {
                    const dataIndex = payload?.[0]?.payload;
                    return dataIndex?.name || value;
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}