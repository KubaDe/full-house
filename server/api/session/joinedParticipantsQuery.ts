import { protectedProcedure } from "../../trpc";
import { requireSessionAllowedMiddleware } from "../authorization/requireSessionAllowedMiddleware";
import {
  joinedParticipantsQueryInputSchema,
  joinedParticipantsQueryOutputSchema,
} from "@/modules/session/schemas/api/joinedParticipantsSchema";
import { sessionEventService } from "@/server/services/event/sessionEventService";

export const joinedParticipantsQuery = protectedProcedure
  .input(joinedParticipantsQueryInputSchema)
  .output(joinedParticipantsQueryOutputSchema)
  .unstable_concat(requireSessionAllowedMiddleware)
  .query(async ({ input }) => {
    const joinedParticipantsIds = await sessionEventService.projections.joinedParticipantsProjection({
      sessionId: input.sessionId,
    });
    return joinedParticipantsQueryOutputSchema.parse(joinedParticipantsIds);
  });
