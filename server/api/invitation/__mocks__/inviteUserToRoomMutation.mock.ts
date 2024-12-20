import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@/testUtils/formatters";

export const inviteUserToRoomMutationMock = {
  default: (spy?: Mock) =>
    http.post("*/trpc/invitation.inviteUserToRoomMutation", async ({ request }) => {
      await spy?.(formatTrpcBodyToData(await request?.json()));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: {
                id: "clyw8e0mj0009tz76c9kyixxs",
              },
            },
          },
        },
        { status: 200 },
      );
    }),
};
