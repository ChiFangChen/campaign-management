import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Home, Inbox, Search, Plus } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import { routes } from '@/routes';

const routesItems = [
  {
    label: '',
    items: [
      {
        title: 'Dashboard',
        url: '/',
        icon: Home,
      },
    ],
  },
  {
    label: 'app',
    items: [
      {
        title: 'Campaigns',
        url: '/campaigns',
        icon: Inbox,
        action: (pushPage: ReturnType<typeof useNavigate>) => (
          <SidebarMenuAction onClick={() => pushPage('/campaigns?create=true')}>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarMenuAction>
        ),
      },
      {
        title: 'Inline Items',
        url: '/inline-items',
        icon: Calendar,
      },
      {
        title: 'Invoices',
        url: '/invoices',
        icon: Search,
      },
    ],
  },
];

export const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarHeader className="p-4">Campaign Management</SidebarHeader>
      <SidebarContent>
        {routesItems.map(({ label, items }) => (
          <SidebarGroup key={label}>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const active =
                    item.url === routes.dashboard
                      ? location.pathname === routes.dashboard
                      : location.pathname.includes(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url}
                          className={active ? 'bg-gray-300 hover:bg-gray-200' : ''}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.action?.(navigate)}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
