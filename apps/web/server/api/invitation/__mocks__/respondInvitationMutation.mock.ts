import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@/testUtils/formatters";

export const respondInvitationMutationMock = {
  default: (spy?: Mock) =>
    http.post(
      "*/trpc/invitation.respondInvitationMutation",
      async ({ request }) => {
        await spy?.(formatTrpcBodyToData(await request?.json()));
        return HttpResponse.json(
          {
            result: {
              data: {
                json: undefined,
              },
            },
          },
          { status: 200 },
        );
      },
    ),
};
