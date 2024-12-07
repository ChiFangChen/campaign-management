import { Link } from 'react-router-dom';
import { LucideProps } from 'lucide-react';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

type SidebarItemProps = {
  url: string;
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  active: boolean;
};

export const SidebarItem = ({ url, title, icon: Icon, active }: SidebarItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          to={url}
          className={
            active
              ? 'bg-gray-300 hover:bg-gray-200 dark:bg-black dark:bg-opacity-30 dark:hover:bg-black'
              : ''
          }
        >
          <Icon />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
