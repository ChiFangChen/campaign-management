import { useLocation } from 'react-router-dom';
import { ChartColumnIncreasing, TableProperties, Receipt, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { routes } from '@/routes';
import { SidebarItem } from './SidebarItem';

const routesItems = [
  {
    label: '',
    items: [
      {
        title: 'Dashboard',
        url: routes.dashboard,
        icon: ChartColumnIncreasing,
      },
    ],
  },
  {
    label: 'app',
    items: [
      {
        title: 'Campaigns',
        url: routes.campaigns,
        icon: TableProperties,
      },
      {
        title: 'Invoices',
        url: routes.invoices,
        icon: Receipt,
      },
    ],
  },
];

export const AppSidebar = () => {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarHeader className="p-4">Campaign Management</SidebarHeader>
      <SidebarContent>
        {routesItems.map(({ label, items }) => (
          <SidebarGroup key={label || 'key'}>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const active =
                    item.url === routes.dashboard
                      ? location.pathname === routes.dashboard
                      : location.pathname.includes(item.url);
                  return (
                    <SidebarItem
                      key={item.title}
                      url={item.url}
                      title={item.title}
                      icon={item.icon}
                      active={active}
                    />
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarItem
            url={routes.settings}
            title="Settings"
            icon={Settings}
            active={location.pathname === routes.settings}
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
