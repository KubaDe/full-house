import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@/testUtils/formatters";

export const leaveUserRoomHandler = {
  default: (spy?: Mock) =>
    http.post("*/trpc/userRoom.leaveRoom", async ({ request }) => {
      spy?.(formatTrpcBodyToData(await request?.json()));
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
