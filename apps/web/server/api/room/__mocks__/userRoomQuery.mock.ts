import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const userRoomQueryMock = {
  default: (spy?: Mock) =>
    http.get("*/trpc/room.userRoomQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                room: {
                  id: "clyw3nw6z0002tz76hwd51xfm",
                  name: "Room 1",
                  sessions: [],
                },
                alias: null,
                isOwner: true,
              },
            },
          },
        },
        { status: 200 },
      );
    }),
  member: (spy?: Mock) =>
    http.get("*/trpc/room.userRoomQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                room: {
                  id: "clyw3nw6z0002tz76hwd51xfm",
                  name: "Room 1",
                  sessions: [],
                },
                alias: null,
                isOwner: false,
              },
            },
          },
        },
        { status: 200 },
      );
    }),
  withSessions: (spy?: Mock) =>
    http.get("*/trpc/room.userRoomQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                room: {
                  id: "clyw3nw6z0002tz76hwd51xfm",
                  name: "Room 1",
                  sessions: [
                    {
                      id: "clyw3nw6z0002tz76hwd51xfm",
                      type: "meta",
                    },
                  ],
                },
                alias: null,
                isOwner: true,
              },
            },
          },
        },
        { status: 200 },
      );
    }),
};
