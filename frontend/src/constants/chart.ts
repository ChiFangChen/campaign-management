import { ChartConfig } from '@/components/ui/chart';

export const chartConfig = {
  actual: {
    label: 'Actual',
    color: 'hsl(var(--chart-1))',
  },
  booked: {
    label: 'Booked',
    color: 'hsl(var(--chart-6))',
  },
} satisfies ChartConfig;
