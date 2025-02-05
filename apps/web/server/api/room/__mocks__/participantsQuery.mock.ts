import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const participantsQueryMock = {
  default: (spy?: Mock) =>
    http.get("*/trpc/room.participantsQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [
                {
                  id: "participant-1",
                  profile: {
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
                },
                {
                  id: "participant-2",
                  profile: {
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
                },
              ],
            },
          },
        },
        { status: 200 },
      );
    }),
  noParticipants: (spy?: Mock) =>
    http.get("*/trpc/room.participantsQuery", async ({ request }) => {
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
  manyParticipants: (spy?: Mock) =>
    http.get("*/trpc/room.participantsQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [
                {
                  id: "clzj4o50g0001ajewnsnipmpfs",
                  profile: {
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
                },
                {
                  id: "clzj4o50g0001ocgamdsnasdds",
                  profile: {
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
                },
                {
                  id: "clzj4o50g0001ocgamdsnaapskdpo",
                  profile: {
                    id: "clzj4o50g0001oaksdopsk",
                    name: "Will Brown",
                    avatar: {
                      body: "Shirt",
                      face: "Calm",
                      hair: "HatHip",
                      facialHair: "FullMedium",
                      accessory: "SunglassClubmaster",
                    },
                  },
                },
                {
                  id: "clzj4o50g0001ocgazmlzkxncl",
                  profile: {
                    id: "clzj4o50g0001ocgxopiopiewqop",
                    name: "Will Brown",
                    avatar: {
                      body: "Shirt",
                      face: "Calm",
                      hair: "HatHip",
                      facialHair: "FullMedium",
                      accessory: "SunglassClubmaster",
                    },
                  },
                },
              ],
            },
          },
        },
        { status: 200 },
      );
    }),
};
