import { protectedProcedure } from "../../trpc";
import { requireSessionAllowedMiddleware } from "../../authorization/requireSessionAllowedMiddleware";
import {
  liveMessagesQueryOutputSchema,
  liveMessagesQueryInputSchema,
} from "@repo/schemas";
import { sessionEventService } from "@repo/services/event";

export const liveMessagesQuery = protectedProcedure
  .input(liveMessagesQueryInputSchema)
  .output(liveMessagesQueryOutputSchema)
  .unstable_concat(requireSessionAllowedMiddleware)
  .query(async (opts) => {
    const { input } = opts;
    const messages =
      await sessionEventService.projections.chat.liveMessagesProjection({
        sessionId: input.sessionId,
        cursor: input.cursor,
      });

    return liveMessagesQueryOutputSchema.parse(messages);
  });
