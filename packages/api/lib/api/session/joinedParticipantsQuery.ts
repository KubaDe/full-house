import { protectedProcedure } from "../trpc";
import { requireSessionAllowedMiddleware } from "../authorization/requireSessionAllowedMiddleware";
import {
  joinedParticipantsQueryInputSchema,
  joinedParticipantsQueryOutputSchema,
} from "@repo/schemas";
import { sessionEventService } from "@repo/services/event";

export const joinedParticipantsQuery = protectedProcedure
  .input(joinedParticipantsQueryInputSchema)
  .output(joinedParticipantsQueryOutputSchema)
  .unstable_concat(requireSessionAllowedMiddleware)
  .query(async ({ input }) => {
    const joinedParticipantsIds =
      await sessionEventService.projections.meta.joinedParticipantsProjection({
        sessionId: input.sessionId,
      });
    return joinedParticipantsQueryOutputSchema.parse(joinedParticipantsIds);
  });
