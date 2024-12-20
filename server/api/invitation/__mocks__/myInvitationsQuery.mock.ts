import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const myInvitationsQueryMock = {
  default: (spy?: Mock) =>
    http.get("*/trpc/invitation.myInvitationsQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: [
                {
                  id: "cm12c48ty000rz1t213dn2i86",
                  sender: {
                    email: "foo@gmail.com",
                  },
                  room: {
                    id: "cm0s9qrxb0005q8wl8un7g33m",
                    name: "Test room 1",
                  },
                },
                {
                  id: "cm12c48tyasdfz1t213dn2i86",
                  sender: {
                    email: "bar@gmail.com",
                  },
                  room: {
                    id: "cm0s9qrxbqwe5q8wl8un7g33m",
                    name: "Test room 2",
                  },
                },
              ],
            },
          },
        },
        { status: 200 },
      );
    }),
  empty: (spy?: Mock) =>
    http.get("*/trpc/invitation.myInvitationsQuery", async ({ request }) => {
      const url = new URL(request.url);
      await spy?.(parse(url.searchParams.get("input")!));
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
