import { AppRouter } from '@repo/trpc/router';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {};
      },
    }),
  ],
});
