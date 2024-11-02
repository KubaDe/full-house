import { protectedProcedure } from "../../trpc";
import { requireSessionAllowedMiddleware } from "../authorization/requireSessionAllowedMiddleware";
import {
  activeParticipantsQueryOutputSchema,
  activeParticipantsQueryInputSchema,
} from "@/modules/session/schemas/api/activeParticipantsSchema";
import { sessionEventService } from "@/server/services/event/sessionEventService";

export const activeParticipantsQuery = protectedProcedure
  .input(activeParticipantsQueryInputSchema)
  .output(activeParticipantsQueryOutputSchema)
  .unstable_concat(requireSessionAllowedMiddleware)
  .query(async ({ input }) => {
    const activeParticipants = await sessionEventService.projections.activeParticipantsProjection({
      sessionId: input.sessionId,
    });
    return activeParticipantsQueryOutputSchema.parse(activeParticipants);
  });
