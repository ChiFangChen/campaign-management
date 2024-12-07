import { useTranslation } from 'react-i18next';
import { MoveVertical, MoveUp, MoveDown, Search } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  Row,
} from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { UsePaginationReturn, UseTableFiltersReturn, UseTableSortingReturn } from '@/hooks';
import { Loader, Input, Button, Popover, PopoverContent, PopoverTrigger } from '@/components';
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { SkeletonCell } from './SkeletonCell';
import { AmountTableCell } from './AmountTableCell';
import { Pagination } from './Pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  paginationData?: PaginationData;
  isLoading?: boolean;
  isFetching?: boolean;
  paginationState?: UsePaginationReturn;
  filtersState?: UseTableFiltersReturn;
  sortingState?: UseTableSortingReturn;
  onRowClick?: (row: Row<TData>) => void;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  goTopOnPaging?: boolean;
  isBordered?: boolean;
  footer?: React.ReactNode | ((filteredRows: Row<TData>[]) => React.ReactNode);
}

export const Table = <TData, TValue>({
  columns,
  data = [],
  paginationData,
  isLoading = false,
  isFetching = false,
  paginationState,
  filtersState,
  sortingState,
  onRowClick,
  goTopOnPaging = true,
  manualPagination = true,
  isBordered = true,
  footer,
}: DataTableProps<TData, TValue>) => {
  const { t } = useTranslation();
  const getPaginationConfig = () => ({
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
    state: {
      pagination: paginationState?.pagination || { pageIndex: 0, pageSize: 10 },
      columnFilters: filtersState?.filters || [],
      sorting: sortingState?.sorting || [],
    },
    ...(paginationState ? getPaginationConfig() : {}),
    ...(filtersState
      ? {
          getFilteredRowModel: getFilteredRowModel(),
          onColumnFiltersChange: filtersState.setFilters,
        }
      : {}),
    ...(sortingState
      ? {
          getSortedRowModel: getSortedRowModel(),
          onSortingChange: sortingState.setSorting,
        }
      : {}),
    getCoreRowModel: getCoreRowModel(),
  });

  const filteredRows = table.getFilteredRowModel().rows;
  const pageCount = filtersState
    ? Math.ceil(filteredRows.length / table.getState().pagination.pageSize)
    : table.getPageCount();

  return (
    <div className="container mx-auto my-4">
      <div className={cn('rounded-md relative', isBordered ? 'border' : '')}>
        {!isLoading && isFetching && <Loader />}
        <UITable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(
                  ({
                    id,
                    isPlaceholder,
                    getContext,
                    column: {
                      getToggleSortingHandler,
                      getCanSort,
                      getIsSorted,
                      getCanFilter,
                      setFilterValue,
                      getFilterValue,
                      columnDef: { header: headerText, meta },
                    },
                  }) => {
                    return (
                      <TableHead key={id} className="">
                        <div
                          className={cn(
                            'flex items-center',
                            meta?.className || '',
                            meta?.type === 'currency' || meta?.align === 'right'
                              ? 'text-right justify-end'
                              : '',
                            meta?.align === 'center' ? 'text-center justify-center' : ''
                          )}
                        >
                          {isPlaceholder ? null : meta?.sortable ? (
                            <div
                              className={cn(
                                'flex items-center',
                                getCanSort() ? 'cursor-pointer' : ''
                              )}
                              onClick={getToggleSortingHandler()}
                            >
                              <div>{flexRender(headerText, getContext())}</div>
                              <div>
                                {getIsSorted() ? (
                                  getIsSorted() === 'desc' ? (
                                    <MoveDown className="h-4 text-black dark:text-gray-200" />
                                  ) : (
                                    <MoveUp className="h-4 text-black dark:text-gray-200" />
                                  )
                                ) : (
                                  <MoveVertical className="h-4" />
                                )}
                              </div>
                            </div>
                          ) : (
                            flexRender(headerText, getContext())
                          )}
                          {meta?.filterId && getCanFilter() && (
                            <Popover>
                              <PopoverTrigger>
                                <Search
                                  className={cn('h-4', getFilterValue() ? 'text-black' : '')}
                                />
                              </PopoverTrigger>
                              <PopoverContent className="w-80 flex gap-4">
                                <Input
                                  placeholder={`${t('Filter {{name}}', { name: headerText })}`}
                                  className="text-xs border rounded ml-0"
                                  value={(getFilterValue() as string) || ''}
                                  onChange={(e) => setFilterValue(e.target.value)}
                                />
                                <Button variant="outline" onClick={() => setFilterValue('')}>
                                  {t('reset')}
                                </Button>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                      </TableHead>
                    );
                  }
                )}
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
                  {row.getVisibleCells().map(
                    ({
                      column: {
                        columnDef: { cell, meta },
                      },
                      id,
                      getValue,
                      getContext,
                    }) =>
                      meta?.type === 'currency' ? (
                        <AmountTableCell
                          key={id}
                          amount={getValue() as number}
                          className={meta?.className || ''}
                        />
                      ) : (
                        <TableCell
                          key={id}
                          className={cn(
                            meta?.className || '',
                            meta?.align ? `text-${meta?.align}` : ''
                          )}
                        >
                          {flexRender(cell, getContext())}
                        </TableCell>
                      )
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {t('noDataAvailable')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {footer && (
            <TableFooter>
              {typeof footer === 'function' ? footer(filteredRows) : footer}
            </TableFooter>
          )}
        </UITable>
      </div>

      {paginationState && !isLoading && (
        <Pagination
          currentPageIndex={table.getState().pagination.pageIndex}
          canPreviousPage={table.getCanPreviousPage()}
          previousPage={table.previousPage}
          canNextPage={table.getCanNextPage()}
          nextPage={table.nextPage}
          goToPage={(pageIndex: number) => table.setPageIndex(pageIndex)}
          totalPages={pageCount}
          goTopOnPaging={goTopOnPaging}
        />
      )}
    </div>
  );
};
