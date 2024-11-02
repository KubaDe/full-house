import { httpLink, splitLink, unstable_httpSubscriptionLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import type { AppRouter } from "@/server/api/_app";

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
export const api = createTRPCNext<AppRouter>({
  transformer: superjson,
  config: () => {
    return {
      links: [
        splitLink({
          // uses the httpSubscriptionLink for subscriptions
          condition: (op) => op.type === "subscription",
          true: unstable_httpSubscriptionLink({
            transformer: superjson,
            url: `${getBaseUrl()}/api/trpc`,
          }),
          false: httpLink({
            transformer: superjson,
            url: `${getBaseUrl()}/api/trpc`,
            async headers() {
              return {
                // authorization: getAuthCookie(),
              };
            },
          }),
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 1000 * 50,
            refetchOnMount: false,
          },
        },
      },
    };
  },
  ssr: false,
});
