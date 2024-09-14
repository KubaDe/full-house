import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const userToRoomInvitationsQueryMock = {
  default: (spy?: Mock) =>
    http.get("*/trpc/invitation.userToRoomInvitationsQuery", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [
                {
                  id: "cm05a8sk4000ectlmjdzq69fu",
                  email: "user1@mail.com",
                },
                {
                  id: "cm059ui84000actlmrym8libl",
                  email: "user2@mail.com",
                },
                {
                  id: "cm059tjyw0006ctlmu9sxo9jp",
                  email: "user3@mail.com",
                },
              ],
            },
          },
        },
        { status: 200 },
      );
    }),
  moreThan9: (spy?: Mock) =>
    http.get("*/trpc/invitation.userToRoomInvitationsQuery", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [
                {
                  id: "cm05a8sk4000ectlmjdzq69fu",
                  email: "user1@mail.com",
                },
                {
                  id: "cm059ui84000actlmrym8libl",
                  email: "user2@mail.com",
                },
                {
                  id: "cm059tjyw0006ctlmuasxo9jp",
                  email: "user3@mail.com",
                },
                {
                  id: "cm05a8dk4000ectlmjdzq69fu",
                  email: "user4@mail.com",
                },
                {
                  id: "cm059uih4000actlmrym8libl",
                  email: "user5@mail.com",
                },
                {
                  id: "cm059tjyw0z06ctlmu9sxo9jp",
                  email: "user6@mail.com",
                },
                {
                  id: "cm05a8sk4000ectlmjdzq694u",
                  email: "user7@mail.com",
                },
                {
                  id: "cm059ui84000actgmrym8libl",
                  email: "user8@mail.com",
                },
                {
                  id: "cm059tjyw0006ctlmu1sxo9jp",
                  email: "user9@mail.com",
                },
                {
                  id: "cm059tjywasdwctlmu1sxo9jp",
                  email: "user10@mail.com",
                },
              ],
            },
          },
        },
        { status: 200 },
      );
    }),
  empty: (spy?: Mock) =>
    http.get("*/trpc/invitation.userToRoomInvitationsQuery", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [],
            },
          },
        },
        { status: 200 },
      );
    }),
};
