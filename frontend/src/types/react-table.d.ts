/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnMeta } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    type?: string;
    className?: string;
    sortable?: boolean;
    filterId?: string; // setting the id to turn on the filter
    align?: 'left' | 'center' | 'right';
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
