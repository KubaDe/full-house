import { z } from "zod";

export const headCursorQueryInputSchema = z.object({
  sessionId: z.string(),
});

export const headCursorQueryOutputSchema = z.string().nullish();
