import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@repo/utils";

export const leaveRoomMutationMock = {
  default: (spy?: Mock) =>
    http.post("*/trpc/room.leaveRoomMutation", async ({ request }) => {
      await spy?.(formatTrpcBodyToData(await request?.json()));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {},
            },
          },
        },
        { status: 200 },
      );
    }),
};
