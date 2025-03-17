import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const roomSessionsQueryMock = {
  default: (spy?: Mock) =>
    http.get("*/trpc/session.roomSessionsQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [
                {
                  id: "cm58ant520001djrlkerioryp",
                  type: "meta",
                  createdAt: "2024-12-28T14:45:58.213Z",
                },
                {
                  id: "cm58ao0o20003djrlhqk0s7a6",
                  type: "chat",
                  createdAt: "2024-12-28T14:46:07.970Z",
                },
              ],
              meta: {
                values: {
                  "0.createdAt": ["Date"],
                  "1.createdAt": ["Date"],
                },
              },
            },
          },
        },
        { status: 200 },
      );
    }),
  noChat: (spy?: Mock) =>
    http.get("*/trpc/session.roomSessionsQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [
                {
                  id: "cm58ant520001djrlkerioryp",
                  type: "meta",
                  createdAt: "2024-12-28T14:45:58.213Z",
                },
              ],
              meta: {
                values: {
                  "0.createdAt": ["Date"],
                  "1.createdAt": ["Date"],
                },
              },
            },
          },
        },
        { status: 200 },
      );
    }),
};
