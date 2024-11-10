import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { parse } from "superjson";

export const roomAggregatedActiveParticipantsQueryMock = {
  default: (options: { ids: string[] }, spy?: Mock) =>
    http.get("*/trpc/session.roomAggregatedActiveParticipantsQuery", async ({ request }) => {
      const url = new URL(request.url);
      spy?.(parse(url.searchParams.get("input")!));
      return HttpResponse.json(
        {
          result: {
            data: {
              json: options.ids,
            },
          },
        },
        { status: 200 },
      );
    }),
};
