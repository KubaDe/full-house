import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@repo/utils";

export const switchOpenInvitationMutationMock = {
  default: (spy?: Mock) =>
    http.post(
      "*/trpc/invitation.switchOpenInvitationMutation",
      async ({ request }) => {
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
      },
    ),
};
