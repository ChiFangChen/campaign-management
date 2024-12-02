declare global {
  type ComponentWithChildren<T = object> = T & {
    children?: ReactNode;
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
