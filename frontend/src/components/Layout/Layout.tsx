import { Outlet, useMatch } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

export const Layout = () => {
  const withoutPaddingYLayout = useMatch('/invoices/:id');
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`flex-1 relative px-16${withoutPaddingYLayout ? '' : ' py-4'}`}>
        <SidebarTrigger className="absolute top-4 left-4" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
