import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

import { QueryClientProvider, ThemeProvider } from '@/contexts';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { rootRouter } from '@/routes/routers';

import './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RecoilRoot>
        <ThemeProvider>
          <QueryClientProvider>
            <TooltipProvider>
              <RouterProvider router={rootRouter} />
            </TooltipProvider>
          </QueryClientProvider>
        </ThemeProvider>
        <Toaster />
      </RecoilRoot>
    </HelmetProvider>
  </StrictMode>
);
