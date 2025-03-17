import { protectedProcedure } from "../trpc";
import { requireSessionAllowedMiddleware } from "../authorization/requireSessionAllowedMiddleware";
import {
  activeParticipantsQueryOutputSchema,
  activeParticipantsQueryInputSchema,
} from "@repo/schemas";
import { sessionEventService } from "@repo/services/event";

export const activeParticipantsQuery = protectedProcedure
  .input(activeParticipantsQueryInputSchema)
  .output(activeParticipantsQueryOutputSchema)
  .unstable_concat(requireSessionAllowedMiddleware)
  .query(async ({ input }) => {
    const activeParticipants =
      await sessionEventService.projections.meta.activeParticipantsProjection({
        sessionId: input.sessionId,
      });
    return activeParticipantsQueryOutputSchema.parse(activeParticipants);
  });
