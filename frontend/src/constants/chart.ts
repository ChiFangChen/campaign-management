import { ChartConfig } from '@/components/ui/chart';

export const chartConfig = {
  actual: {
    label: 'actual',
    color: 'hsl(var(--chart-1))',
  },
  booked: {
    label: 'booked',
    color: 'hsl(var(--chart-6))',
  },
} satisfies ChartConfig;
