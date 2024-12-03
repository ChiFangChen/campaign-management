import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/components';
import { Dashboard } from '@/pages/Dashboard';
import { Campaigns } from '@/pages/Campaigns';
import { LineItems } from '@/pages/LineItems';
import { Invoices } from '@/pages/Invoices';

export const routes = {
  dashboard: '/',
  campaigns: '/campaigns',
  inlineItems: '/inline-items',
  invoices: '/invoices',
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: routes.dashboard, element: <Dashboard /> },
      { path: `${routes.campaigns}/*`, element: <Campaigns /> },
      { path: `${routes.inlineItems}/*`, element: <LineItems /> },
      { path: `${routes.invoices}/*`, element: <Invoices /> },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);
