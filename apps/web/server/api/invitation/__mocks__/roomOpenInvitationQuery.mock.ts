import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const roomOpenInvitationQueryMock = {
  enabled: (spy?: Mock) =>
    http.get(
      "*/trpc/invitation.roomOpenInvitationQuery",
      async ({ request }) => {
        const url = new URL(request.url);
        await spy?.(parse(url.searchParams.get("input")!));
        return HttpResponse.json(
          {
            result: {
              data: {
                json: {
                  id: "testId",
                  link: "http://test.com/",
                },
              },
            },
          },
          { status: 200 },
        );
      },
    ),
  disabled: (spy?: Mock) =>
    http.get(
      "*/trpc/invitation.roomOpenInvitationQuery",
      async ({ request }) => {
        const url = new URL(request.url);
        await spy?.(parse(url.searchParams.get("input")!));
        return HttpResponse.json(
          {
            result: {
              data: {
                json: null,
              },
            },
          },
          { status: 200 },
        );
      },
    ),
};
