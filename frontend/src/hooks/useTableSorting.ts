import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';

export type UseTableSortingReturn = {
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
};

export function useTableSorting() {
  const [sorting, setSorting] = useState<SortingState>([]);

  return { sorting, setSorting };
}
