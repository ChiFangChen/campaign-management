import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Layout } from '@/components';
import { Dashboard } from '@/pages/Dashboard';
import { Campaigns } from '@/pages/Campaigns';
import { Invoices } from '@/pages/Invoices';
import { Settings } from '@/pages/Settings';
import { routes } from './index';

export const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: routes.dashboard, element: <Dashboard /> },
      { path: `${routes.campaigns}/*`, element: <Campaigns /> },
      { path: `${routes.invoices}/*`, element: <Invoices /> },
      { path: `${routes.settings}`, element: <Settings /> },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);
