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
};

export const Pagination = ({
  currentPageIndex,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  goToPage,
  totalPages,
}: PaginationProps) => {
  const currentPage = currentPageIndex + 1;
  return (
    <UIPagination className="mt-4">
      <PaginationContent>
        {canPreviousPage && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={previousPage} />
          </PaginationItem>
        )}

        {!!totalPages && 1 !== currentPage && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => {
                goToPage(0);
              }}
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
            <PaginationLink href="#" onClick={() => goToPage(currentPage - 3)}>
              {currentPage - 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={previousPage}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={nextPage}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage === 1 && totalPages > 3 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => goToPage(currentPage + 1)}>
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
              href="#"
              onClick={() => {
                goToPage(totalPages - 1);
              }}
            >
              {totalPages}
            </PaginationLink>
          )}
        </PaginationItem>

        {canNextPage && (
          <PaginationItem>
            <PaginationNext href="#" onClick={nextPage} />
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  );
};
