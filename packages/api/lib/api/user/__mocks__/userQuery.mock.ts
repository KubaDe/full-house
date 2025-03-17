import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@repo/utils";

export const userQueryMock = {
  default: (spy?: Mock) =>
    http.get("*/trpc/me.userQuery", async ({ request }) => {
      await spy?.(formatTrpcBodyToData(await request?.json()));
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
    http.get("*/trpc/me.userQuery", async ({ request }) => {
      await spy?.(await request?.json());
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
