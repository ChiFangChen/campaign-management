import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  Row,
} from '@tanstack/react-table';
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader } from '@/components/Loader';
import { UsePaginationReturn } from '@/hooks';
import { SkeletonCell } from './SkeletonCell';
import { Pagination } from './Pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  paginationData?: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
  isLoading?: boolean;
  isFetching?: boolean;
  paginationState?: UsePaginationReturn;
  onRowClick?: (row: Row<TData>) => void;
  manualPagination?: boolean;
  goTopOnPaging?: boolean;
  isBordered?: boolean;
}

export const Table = <TData, TValue>({
  columns,
  data = [],
  paginationData,
  isLoading = false,
  isFetching = false,
  paginationState,
  onRowClick,
  goTopOnPaging = true,
  manualPagination = true,
  isBordered = true,
}: DataTableProps<TData, TValue>) => {
  const getPaginationConfig = () => ({
    state: { pagination: paginationState!.pagination },
    onPaginationChange: paginationState!.setPagination,
    ...(manualPagination
      ? {
          manualPagination: true,
          pageCount: paginationData?.totalPages || 0,
        }
      : {
          manualPagination: false,
          pageCount: Math.ceil(data.length / paginationState!.pagination.pageSize),
        }),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const table = useReactTable({
    data,
    columns,
    ...(paginationState ? getPaginationConfig() : {}),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto my-4">
      <div className={`rounded-md relative${isBordered ? ' border' : ''}`}>
        {!isLoading && isFetching && <Loader />}
        <UITable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: columns.length }).map((_, i) => (
                    <SkeletonCell key={i} />
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'cursor-pointer' : ''}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>

      {!isLoading && (
        <Pagination
          currentPageIndex={table.getState().pagination.pageIndex}
          canPreviousPage={table.getCanPreviousPage()}
          previousPage={table.previousPage}
          canNextPage={table.getCanNextPage()}
          nextPage={table.nextPage}
          goToPage={(pageIndex: number) => table.setPageIndex(pageIndex)}
          totalPages={table.getPageCount()}
          goTopOnPaging={goTopOnPaging}
        />
      )}
    </div>
  );
};
