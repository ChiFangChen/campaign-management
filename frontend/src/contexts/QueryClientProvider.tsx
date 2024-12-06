import { useState } from 'react';
import {
  QueryClient,
  QueryCache,
  QueryClientProvider as RQQueryClientProvider,
} from '@tanstack/react-query';

import { useToast } from '@/hooks';

const getErrorHandler = (toast: ReturnType<typeof useToast>['toast']) => (error: unknown) => {
  let title = 'Unknown Error';
  let description = '';
  if (error instanceof Error) {
    title = 'Something got wrong';
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
  const { toast } = useToast();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: getErrorHandler(toast),
        }),
        defaultOptions: {
          mutations: {
            onError: getErrorHandler(toast),
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
