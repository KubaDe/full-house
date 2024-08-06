import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const getUserRoomMyRoomsHandler = {
  default: (spy?: Mock) =>
    http.get("*/trpc/userRoom.myRooms", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                take: 5,
                skip: 0,
                total: 16,
                items: [
                  {
                    room: {
                      id: "clyw3nw6z0002tz76hwd51xfm",
                      name: "Room 1",
                    },
                    alias: null,
                    isOwner: true,
                  },
                  {
                    room: {
                      id: "clyvrw0gr0001tz76mr222mcy",
                      name: "Room 2",
                    },
                    alias: null,
                    isOwner: false,
                  },
                  {
                    room: {
                      id: "clyvrlnn90000tz76c37cfhap",
                      name: "Room 3",
                    },
                    alias: null,
                    isOwner: true,
                  },
                  {
                    room: {
                      id: "clyvq2n6v000c10ct69rwlnpq",
                      name: "Room 4",
                    },
                    alias: null,
                    isOwner: false,
                  },
                  {
                    room: {
                      id: "clyvjhffm000b10ctydkc43m7",
                      name: "Room 5",
                    },
                    alias: null,
                    isOwner: false,
                  },
                ],
              },
              meta: {
                values: {
                  createdAt: ["Date"],
                },
              },
            },
          },
        },
        { status: 200 },
      );
    }),
  lessThan5Rooms: (spy?: Mock) =>
    http.get("*/trpc/userRoom.myRooms", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                take: 5,
                skip: 0,
                total: 3,
                items: [
                  {
                    room: {
                      id: "clyw3nw6z0002tz76hwd51xfm",
                      name: "Room 1",
                    },
                    alias: null,
                    isOwner: true,
                  },
                  {
                    room: {
                      id: "clyvrw0gr0001tz76mr222mcy",
                      name: "Room 2",
                    },
                    alias: null,
                    isOwner: true,
                  },
                  {
                    room: {
                      id: "clyvrlnn90000tz76c37cfhap",
                      name: "Room 3",
                    },
                    alias: null,
                    isOwner: true,
                  },
                ],
              },
              meta: {
                values: {
                  createdAt: ["Date"],
                },
              },
            },
          },
        },
        { status: 200 },
      );
    }),
};
