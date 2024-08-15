import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@/testUtils/formatters";

export const updateProfileMutationMock = {
  default: (spy?: Mock) =>
    http.post("*/trpc/me.updateProfileMutation", async ({ request }) => {
      spy?.(formatTrpcBodyToData(await request?.json()));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                id: "clyc6x8qp0043pdja1nu6rha7",
                clerkId: "user_2iLbZvYLCpWRxam26ZhqaR9bYon",
                profile: {
                  name: "Foo Bar",
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
