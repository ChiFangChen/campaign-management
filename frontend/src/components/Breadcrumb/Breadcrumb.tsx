import { useNavigate } from 'react-router-dom';
import {
  Breadcrumb as UIBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components';

type BreadcrumbProps = {
  isLoading?: boolean;
  list: {
    name: string;
    url: string;
  }[];
};

export const Breadcrumb = ({ isLoading = false, list }: BreadcrumbProps) => {
  const navigate = useNavigate();

  const handleClick = (url: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(url, { state: { fromBreadcrumb: true } });
  };

  return (
    <UIBreadcrumb className="mb-2">
      <BreadcrumbList>
        {list.map((item, index) => [
          <BreadcrumbItem key={item.name}>
            <BreadcrumbLink onClick={handleClick(item.url)} className="cursor-pointer">
              {item.name}
            </BreadcrumbLink>
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
};
