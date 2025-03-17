import { protectedProcedure } from "../../trpc";
import { requireSessionAllowedMiddleware } from "../../authorization/requireSessionAllowedMiddleware";
import {
  headCursorQueryOutputSchema,
  headCursorQueryInputSchema,
} from "@repo/schemas";
import { sessionEventService } from "@repo/services/event";

export const headCursorQuery = protectedProcedure
  .input(headCursorQueryInputSchema)
  .output(headCursorQueryOutputSchema)
  .unstable_concat(requireSessionAllowedMiddleware)
  .query(async (opts) => {
    const { input } = opts;
    const headCursor =
      await sessionEventService.projections.chat.headCursorProjection({
        sessionId: input.sessionId,
      });

    return headCursorQueryOutputSchema.parse(headCursor);
  });
