import { http, HttpResponse } from "msw";
import { type Mock } from "vitest";
import { formatTrpcBodyToData } from "@repo/utils";

export const createSessionMutationMock = {
  default: (spy?: Mock) =>
    http.post("*/trpc/session.createSessionMutation", async ({ request }) => {
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
  error: (spy?: Mock) =>
    http.post("*/trpc/session.createSessionMutation", async ({ request }) => {
      await spy?.(formatTrpcBodyToData(await request?.json()));
      return HttpResponse.json(
        {
          error: {
            json: {
              message: "An error occurred",
              code: -32603,
              data: {
                code: "INTERNAL_SERVER_ERROR",
                httpStatus: 500,
                path: "event.pushInputEventMutation",
                zodError: null,
              },
            },
          },
        },
        { status: 500 },
      );
    }),
};
