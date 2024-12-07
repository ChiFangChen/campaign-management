import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

export const AppSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const routesItems = [
    {
      label: '',
      items: [
        {
          title: t('dashboard'),
          url: routes.dashboard,
          icon: ChartColumnIncreasing,
        },
      ],
    },
    {
      label: t('managementModules'),
      items: [
        {
          title: t('campaigns'),
          url: routes.campaigns,
          icon: TableProperties,
        },
        {
          title: t('invoices'),
          url: routes.invoices,
          icon: Receipt,
        },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">{t('campaignManagementSystem')}</SidebarHeader>
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
            title={t('settings')}
            icon={Settings}
            active={location.pathname === routes.settings}
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
