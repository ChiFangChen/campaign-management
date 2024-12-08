import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Layout, Loader } from '@/components';
import { routes } from './index';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Campaigns = lazy(() => import('@/pages/Campaigns'));
const Invoices = lazy(() => import('@/pages/Invoices'));
const Settings = lazy(() => import('@/pages/Settings'));

export const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: routes.dashboard,
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: `${routes.campaigns}/*`,
        element: (
          <Suspense fallback={<Loader />}>
            <Campaigns />
          </Suspense>
        ),
      },
      {
        path: `${routes.invoices}/*`,
        element: (
          <Suspense fallback={<Loader />}>
            <Invoices />{' '}
          </Suspense>
        ),
      },
      {
        path: `${routes.settings}`,
        element: (
          <Suspense fallback={<Loader />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);
