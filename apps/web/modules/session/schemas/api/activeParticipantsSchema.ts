import { z } from "zod";

export const activeParticipantsQueryInputSchema = z.object({
  sessionId: z.string(),
});

export const activeParticipantsQueryOutputSchema = z
  .array(z.string())
  .default([]);
