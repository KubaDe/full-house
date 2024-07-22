import { z } from "zod";
export const roomOutputSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(3).max(255),
});

export const roomInputSchema = z.object({
  name: z.string().trim().min(3).max(255),
});
