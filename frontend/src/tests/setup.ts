import { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import reactI18next from './__mocks__/react-i18next';
import { Helmet } from './__mocks__/react-helmet-async';
import * as components from './__mocks__/components';

beforeEach(() => {
  cleanup();
});

vi.mock('react-i18next', () => reactI18next);
vi.mock('react-helmet-async', () => ({ Helmet }));
vi.mock('@/components', async (importOriginal) => {
  const actual: ReactNode[] = await importOriginal();
  return {
    ...actual,
    ...components,
  };
});
vi.mock('@/lib/formatter-utils', () => ({
  formatAmount: vi.fn((value) => `$${value}`),
}));
