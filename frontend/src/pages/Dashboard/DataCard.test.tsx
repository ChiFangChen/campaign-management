import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataCard } from './DataCard';

describe('DataCard', () => {
  it('renders title and description correctly', () => {
    render(<DataCard title="Total Campaigns" description="Description here" data="100" />);
    expect(screen.getByText('Total Campaigns')).toBeInTheDocument();
    expect(screen.getByText('Description here')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('shows Skeleton when isLoading is true', () => {
    render(<DataCard title="Total Campaigns" isLoading />);
    expect(screen.getByText('Total Campaigns')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
