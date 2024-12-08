export const Title = ({ children }: ComponentWithChildren) => <h1>{children}</h1>;

export const TabbedAmountComparisonChart = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data?: {
    totalBookedAmount?: number;
    totalActualAmount?: number;
    comparisonData?: ComparisonData[];
  };
}) => (
  <div data-testid="tabbed-chart" data-loading={String(isLoading)}>
    {isLoading ? <div>Loading...</div> : JSON.stringify(data)}
  </div>
);

export const DataCard = ({
  title,
  data,
  isLoading,
}: {
  title: string;
  data?: string;
  isLoading?: boolean;
}) => (
  <div data-testid="data-card">
    <div>{title}</div>
    {isLoading ? <div role="status">Loading...</div> : <div>{data}</div>}
  </div>
);
