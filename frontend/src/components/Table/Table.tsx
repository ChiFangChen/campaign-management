import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
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
import { Button } from '@/components/ui/button';
import { UsePaginationReturn } from '@/hooks';
import { SkeletonCell } from './SkeletonCell';
import { Pagination } from './Pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: {
    current_page: number;
    total_pages: number;
    total_count: number;
    data: TData[];
  };
  isLoading?: boolean;
  isFetching?: boolean;
  paginationState: UsePaginationReturn;
}

export const Table = <TData, TValue>({
  columns,
  data,
  isLoading = false,
  isFetching = false,
  paginationState,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data: data?.data || [],
    columns,
    pageCount: data?.total_pages || 0,
    manualPagination: true,
    state: { pagination: paginationState.pagination },
    onPaginationChange: paginationState.setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log('table', table);

  return (
    <div className="container mx-auto my-4">
      <div className="rounded-md border relative">
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
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
        />
      )}
    </div>
  );
};
