import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/components';
import { Dashboard } from '@/pages/Dashboard';
import { Campaigns } from '@/pages/Campaigns';
import { Invoices } from '@/pages/Invoices';
import { routes } from './index';

export const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: routes.dashboard, element: <Dashboard /> },
      { path: `${routes.campaigns}/*`, element: <Campaigns /> },
      { path: `${routes.invoices}/*`, element: <Invoices /> },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);
