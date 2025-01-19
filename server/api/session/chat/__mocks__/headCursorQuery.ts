import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const headCursorQueryMock = {
  once: (spy?: Mock) =>
    http.get(
      "*/trpc/session.chat.headCursorQuery",
      async ({ request }) => {
        const url = new URL(request.url);
        await spy?.(parse(url.searchParams.get("input")!));
        return HttpResponse.json(
          {
            result: {
              data: {
                json: "1735741291228-0",
              },
            },
          },
          { status: 200 },
        );
      },
      { once: true },
    ),
};
