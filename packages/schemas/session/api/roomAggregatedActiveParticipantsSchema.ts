import { z } from "zod";

export const roomAggregatedActiveParticipantsQueryInputSchema = z.object({
  roomId: z.string(),
});

export const roomAggregatedActiveParticipantsQueryOutputSchema = z
  .array(z.string())
  .default([]);
