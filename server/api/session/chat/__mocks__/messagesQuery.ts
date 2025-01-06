import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const messagesQueryMock = {
  singleMessageOnce: (spy?: Mock) =>
    http.get(
      "*/trpc/session.chat.messagesQuery",
      async ({ request }) => {
        const url = new URL(request.url);
        await spy?.(parse(url.searchParams.get("input")!));
        return HttpResponse.json(
          {
            result: {
              data: {
                json: {
                  moreCount: 63,
                  messages: [
                    {
                      id: "1735741291228-0",
                      payload: {
                        message: "Single message",
                      },
                      userId: "participant-1",
                    },
                  ],
                },
              },
            },
          },
          { status: 200 },
        );
      },
      { once: true },
    ),
  middleMessagesPageOnce: (spy?: Mock) =>
    http.get(
      "*/trpc/session.chat.messagesQuery",
      async ({ request }) => {
        const url = new URL(request.url);
        await spy?.(parse(url.searchParams.get("input")!));
        return HttpResponse.json(
          {
            result: {
              data: {
                json: {
                  moreCount: 44,
                  messages: [
                    {
                      id: "1735521891728-0",
                      payload: {
                        message: "46",
                      },
                      userId: "participant-1",
                    },
                    {
                      id: "1735521884775-0",
                      payload: {
                        message: "45",
                      },
                      userId: "participant-2",
                    },
                    {
                      id: "1735521871610-0",
                      payload: {
                        message: "44",
                      },
                      userId: "participant-1",
                    },
                  ],
                },
              },
            },
          },
          { status: 200 },
        );
      },
      { once: true },
    ),
  lastMessagesPageOnce: (spy?: Mock) =>
    http.get(
      "*/trpc/session.chat.messagesQuery",
      async ({ request }) => {
        const url = new URL(request.url);
        await spy?.(parse(url.searchParams.get("input")!));
        return HttpResponse.json(
          {
            result: {
              data: {
                json: {
                  moreCount: 0,
                  messages: [
                    {
                      id: "1735521858323-0",
                      payload: {
                        message: "43",
                      },
                      userId: "participant-1",
                    },
                    {
                      id: "1735521445369-0",
                      payload: {
                        message: "42",
                      },
                      userId: "participant-2",
                    },
                    {
                      id: "1735521439387-0",
                      payload: {
                        message: "41",
                      },
                      userId: "participant-1",
                    },
                  ],
                },
              },
            },
          },
          { status: 200 },
        );
      },
      { once: true },
    ),
};
