import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const getParticipantsHandler = {
  default: (spy?: Mock) =>
    http.get("*/trpc/userRoom.participants", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [
                {
                  id: "clzj4o50g0001ocgxsnipmpfs",
                  name: "John Smith",
                  avatar: {
                    body: "Shirt",
                    face: "Calm",
                    hair: "HatHip",
                    facialHair: "FullMedium",
                    accessory: "SunglassClubmaster",
                  },
                },
                {
                  id: "clzj4o50g0001ocgxsniasdds",
                  name: "Will Brown",
                  avatar: {
                    body: "Shirt",
                    face: "Calm",
                    hair: "HatHip",
                    facialHair: "FullMedium",
                    accessory: "SunglassClubmaster",
                  },
                },
              ],
            },
          },
        },
        { status: 200 },
      );
    }),
  noParticipants: (spy?: Mock) =>
    http.get("*/trpc/userRoom.participants", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
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
};
