import { useState } from 'react';
import { ColumnFiltersState } from '@tanstack/react-table';

export type UseTableFiltersReturn = {
  filters: ColumnFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
};

export function useTableFilters(): UseTableFiltersReturn {
  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  return { filters, setFilters };
}
