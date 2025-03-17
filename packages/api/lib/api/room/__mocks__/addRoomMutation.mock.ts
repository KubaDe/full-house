import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@repo/utils";

export const addRoomMutationMock = {
  default: (spy?: Mock) =>
    http.post("*/trpc/room.addRoomMutation", async ({ request }) => {
      await spy?.(formatTrpcBodyToData(await request?.json()));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                room: {
                  id: "clyw8e0mj0009tz76c9kyixxs",
                  name: "New room",
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
