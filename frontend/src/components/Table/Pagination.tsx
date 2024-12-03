import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
  currentPageIndex: number;
  canPreviousPage: boolean;
  previousPage: () => void;
  canNextPage: boolean;
  nextPage: () => void;
  goToPage: (pageIndex: number) => void;
  totalPages: number;
  goTopOnPaging: boolean;
};

export const Pagination = ({
  currentPageIndex,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  goToPage,
  totalPages,
  goTopOnPaging,
}: PaginationProps) => {
  const onClickWrapper =
    (onClickFunc?: (e: React.MouseEvent<HTMLAnchorElement>) => void) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (goTopOnPaging) scrollTo(0, 0);
      onClickFunc?.(e);
    };
  const currentPage = currentPageIndex + 1;
  return (
    <UIPagination className="mt-4">
      <PaginationContent>
        {canPreviousPage && (
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={onClickWrapper(previousPage)} />
          </PaginationItem>
        )}

        {!!totalPages && 1 !== currentPage && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={onClickWrapper(() => {
                goToPage(0);
              })}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 3 && totalPages > 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage === totalPages && totalPages > 3 && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={onClickWrapper(() => goToPage(currentPage - 3))}
            >
              {currentPage - 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={onClickWrapper(previousPage)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive className="cursor-pointer" onClick={onClickWrapper()}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={onClickWrapper(nextPage)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage === 1 && totalPages > 3 && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={onClickWrapper(() => goToPage(currentPage + 1))}
            >
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - 2 && totalPages > 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          {![0, 1, currentPage].includes(totalPages) && (
            <PaginationLink
              className="cursor-pointer"
              onClick={onClickWrapper(() => {
                goToPage(totalPages - 1);
              })}
            >
              {totalPages}
            </PaginationLink>
          )}
        </PaginationItem>

        {canNextPage && (
          <PaginationItem>
            <PaginationNext className="cursor-pointer" onClick={onClickWrapper(nextPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  );
};
