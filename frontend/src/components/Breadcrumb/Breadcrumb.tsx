import {
  Breadcrumb as UIBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';

type BreadcrumbProps = {
  isLoading?: boolean;
  list: {
    name: string;
    url: string;
  }[];
};

export const Breadcrumb = ({ isLoading = false, list }: BreadcrumbProps) => (
  <UIBreadcrumb className="mb-2">
    <BreadcrumbList>
      {list.map((item, index) => [
        <BreadcrumbItem key={item.name}>
          <BreadcrumbLink href={item.url}>{item.name}</BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbSeparator key={index} aria-hidden="true" />,
      ])}
      {isLoading && (
        <>
          <BreadcrumbItem className="flex">
            <Skeleton className="h-4 w-32" />
          </BreadcrumbItem>
          <BreadcrumbSeparator aria-hidden="true" />
        </>
      )}
    </BreadcrumbList>
  </UIBreadcrumb>
);
