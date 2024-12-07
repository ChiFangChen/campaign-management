import { useState } from 'react';
import i18n from 'i18next';
import {
  QueryClient,
  QueryCache,
  QueryClientProvider as RQQueryClientProvider,
} from '@tanstack/react-query';

import { toast } from '@/hooks';

const getErrorHandler = () => (error: unknown) => {
  const { t } = i18n;
  let title = t('unknownError');
  let description = '';
  if (error instanceof Error) {
    title = t('somethingGotWrong');
    description = error.message;
    console.error('Error Message:', error.message);
  } else {
    console.error('Unknown Error:', error);
  }
  toast({
    variant: 'destructive',
    title,
    description,
  });
};

export const QueryClientProvider = ({ children }: ComponentWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: getErrorHandler(),
        }),
        defaultOptions: {
          mutations: {
            onError: getErrorHandler(),
          },
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60000,
          },
        },
      })
  );

  return <RQQueryClientProvider client={queryClient}>{children}</RQQueryClientProvider>;
};
