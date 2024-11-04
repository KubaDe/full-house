import { z } from "zod";

export const roomAggregatedJoinedParticipantsQueryInputSchema = z.object({ roomId: z.string() });

export const roomAggregatedJoinedParticipantsQueryOutputSchema = z.array(z.string()).default([]);
