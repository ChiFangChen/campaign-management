import { useState } from 'react';

type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type UsePaginationReturn = {
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
};

export function usePagination() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return { pagination, setPagination };
}
