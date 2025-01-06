import { protectedProcedure } from "../../../trpc";
import { requireSessionAllowedMiddleware } from "../../authorization/requireSessionAllowedMiddleware";
import {
  messagesQueryOutputSchema,
  messagesQueryInputSchema,
} from "@/modules/session/schemas/api/chat/messagesQuerySchema";
import { sessionEventService } from "@/server/services/event/sessionEventService";

export const messagesQuery = protectedProcedure
  .input(messagesQueryInputSchema)
  .output(messagesQueryOutputSchema)
  .unstable_concat(requireSessionAllowedMiddleware)
  .query(async (opts) => {
    const { input } = opts;
    const { messages, moreCount } = await sessionEventService.projections.chat.infinityMessagesProjection({
      sessionId: input.sessionId,
      limit: input.limit,
      cursor: input.cursor,
    });

    return messagesQueryOutputSchema.parse({ messages, moreCount });
  });
