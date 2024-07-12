import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";

export const getMeUserHandler = {
  default: (spy?: Mock) =>
    http.get("*/trpc/me.user", async ({ request }) => {
      spy?.(await request?.json());
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                id: "clyc6x8qp0043pdja1nu6rha7",
                clerkId: "user_2iLbZvYLCpWRxam26ZhqaR9bYon",
                profile: {
                  name: "Foo bar",
                  avatar: {
                    accessory: "None",
                    body: "BlazerBlackTee",
                    face: "Angry",
                    facialHair: "None",
                    hair: "Afro",
                  },
                },
                createdAt: "2024-07-07T23:34:28.225Z",
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
  noProfile: (spy?: Mock) =>
    http.get("*/trpc/me.user", async ({ request }) => {
      spy?.(await request?.json());
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                id: "clyc6x8qp0043pdja1nu6rha7",
                clerkId: "user_2iLbZvYLCpWRxam26ZhqaR9bYon",
                profile: null,
                createdAt: "2024-07-07T23:34:28.225Z",
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

export const updateMeProfileHandler = {
  default: (spy?: Mock) =>
    http.post("*/trpc/me.updateProfile", async ({ request }) => {
      spy?.(await request?.json());
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                id: "clyc6x8qp0043pdja1nu6rha7",
                clerkId: "user_2iLbZvYLCpWRxam26ZhqaR9bYon",
                profile: {
                  name: "aFoo bara",
                  avatar: {
                    body: "ButtonShirt",
                    face: "Blank",
                    hair: "BunCurly",
                    facialHair: "Chin",
                    accessory: "GlassRoundThick",
                  },
                },
                createdAt: "2024-07-07T23:34:28.225Z",
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
