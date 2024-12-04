import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@/contexts/QueryClientProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { rootRouter } from '@/routes/routers';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider>
      <TooltipProvider>
        <RouterProvider router={rootRouter} />
      </TooltipProvider>
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
