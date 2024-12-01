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

const routes = [
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
          <SidebarMenuAction onClick={() => pushPage('/campaigns/create')}>
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
  console.log('location', location);
  return (
    <Sidebar>
      <SidebarHeader className="p-4">Campaign Management</SidebarHeader>
      <SidebarContent>
        {routes.map(({ label, items }) => (
          <SidebarGroup key={label}>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.action?.(navigate)}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
