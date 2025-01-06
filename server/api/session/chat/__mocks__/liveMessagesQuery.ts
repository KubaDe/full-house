import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const liveMessagesQueryMock = {
  empty: (spy?: Mock) =>
    http.get("*/trpc/session.chat.liveMessagesQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [],
            },
          },
        },
        { status: 200 },
      );
    }),
  default: (spy?: Mock) =>
    http.get("*/trpc/session.chat.liveMessagesQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [
                {
                  id: "1735741291228-0",
                  payload: {
                    message: "Live message 2",
                  },
                  userId: "participant-1",
                },
                {
                  id: "1735741242805-0",
                  payload: {
                    message: "Live message 1",
                  },
                  userId: "participant-2",
                },
              ],
            },
          },
        },
        { status: 200 },
      );
    }),
};
