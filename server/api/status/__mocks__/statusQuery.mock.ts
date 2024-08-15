import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const statusQueryMock = {
  apiOk: (spy?: Mock) =>
    http.get("*/trpc/status.statusQuery", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                api: true,
                database: true,
              },
            },
          },
        },
        { status: 200 },
      );
    }),
  apiError: (spy?: Mock) =>
    http.get("*/trpc/status.statusQuery", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                api: true,
                database: false,
              },
            },
          },
        },
        { status: 200 },
      );
    }),
};
