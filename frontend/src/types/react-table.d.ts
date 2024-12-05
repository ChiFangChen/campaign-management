/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnMeta } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    type?: string;
    className?: string;
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
