declare global {
  type ComponentWithChildren<T = object> = T & {
    children?: ReactNode;
  };

  type PaginationParams = {
    page: number;
    per_page: number;
  };

  type Campaign = {
    id: number;
    name: string;
  };

  type LineItem = {
    id: number;
    name: string;
    actual_amount: number;
    booked_amount: number;
  };

  type Invoice = {
    id: number;
    adjustments: number;
  };
}

export {};
