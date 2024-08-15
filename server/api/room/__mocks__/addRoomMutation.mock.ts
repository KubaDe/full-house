import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@/testUtils/formatters";

export const addRoomMutationMock = {
  default: (spy?: Mock) =>
    http.post("*/trpc/room.addRoomMutation", async ({ request }) => {
      spy?.(formatTrpcBodyToData(await request?.json()));
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
