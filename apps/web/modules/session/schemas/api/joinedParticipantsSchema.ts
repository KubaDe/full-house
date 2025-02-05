import { z } from "zod";

export const joinedParticipantsQueryInputSchema = z.object({
  sessionId: z.string(),
});

export const joinedParticipantsQueryOutputSchema = z
  .array(z.string())
  .default([]);
