import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const getUserRoomMyRoomHandler = {
  default: (spy?: Mock) =>
    http.get("*/trpc/userRoom.myRoom", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                room: {
                  id: "clyw3nw6z0002tz76hwd51xfm",
                  name: "Room 1",
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
    http.get("*/trpc/userRoom.myRoom", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                room: {
                  id: "clyw3nw6z0002tz76hwd51xfm",
                  name: "Room 1",
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
};
