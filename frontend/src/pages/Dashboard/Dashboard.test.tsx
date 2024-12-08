/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { formatAmount } from '@/lib/formatter-utils';
import { useDashboard } from '@/queries';
import { Dashboard } from './Dashboard';

const TRANSLATIONS = {
  title: 'Dashboard - Campaign Management System',
  description: 'View an overview of key campaign metrics and performance data.',
} as const;

vi.mock('@/queries', () => ({
  useDashboard: vi.fn(),
}));

describe('Dashboard', () => {
  const mockDashboardData = {
    amount: {
      totalBookedAmount: 0,
      totalActualAmount: 0,
      comparisonData: [],
    },
    totalCampaigns: 50,
    totalLineItems: 150,
    totalAdjustments: 1000,
  };

  it('renders dashboard with loading state', () => {
    vi.mocked(useDashboard).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as any);

    render(<Dashboard />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('tabbed-chart')).toHaveAttribute('data-loading', 'true');

    const loadingCards = screen.getAllByRole('status');
    expect(loadingCards.length).toBe(3);
  });

  it('renders dashboard with data', () => {
    vi.mocked(useDashboard).mockReturnValue({
      isLoading: false,
      data: mockDashboardData,
    } as any);

    render(<Dashboard />);

    const chart = screen.getByTestId('tabbed-chart');
    expect(chart).toHaveAttribute('data-loading', 'false');
    expect(chart).toHaveTextContent(JSON.stringify(mockDashboardData.amount));

    expect(screen.getByText('Total Campaigns')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();

    expect(screen.getByText('Total Line Items')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();

    expect(screen.getByText('Total Adjustments')).toBeInTheDocument();
    expect(formatAmount).toHaveBeenCalledWith(1000);
    expect(screen.getByText('$1000')).toBeInTheDocument();
  });

  it('handles error state', () => {
    vi.mocked(useDashboard).mockReturnValue({
      isLoading: false,
      data: undefined,
    } as any);

    render(<Dashboard />);

    expect(screen.getByTestId('tabbed-chart')).toHaveAttribute('data-loading', 'false');
    expect(screen.queryByText('50')).not.toBeInTheDocument();
  });

  it('sets correct page title and meta description', () => {
    vi.mocked(useDashboard).mockReturnValue({
      isLoading: false,
      data: mockDashboardData,
    } as any);

    render(<Dashboard />);

    expect(document.title).toBe(TRANSLATIONS.title);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).not.toBeNull();
    expect(metaDescription?.getAttribute('content')).toBe(TRANSLATIONS.description);
  });
});
