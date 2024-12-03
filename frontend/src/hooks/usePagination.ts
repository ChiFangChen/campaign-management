import { useState } from 'react';

export type UsePaginationReturn = {
  pagination: PaginationParams;
  setPagination: React.Dispatch<React.SetStateAction<PaginationParams>>;
};

export function usePagination() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return { pagination, setPagination };
}
