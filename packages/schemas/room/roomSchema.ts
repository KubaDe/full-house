import { z } from "zod";
import { sessionTypeSchema } from "../session";

export const roomOutputSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(3).max(255),
  sessions: z
    .array(
      z.object({
        id: z.string(),
        type: sessionTypeSchema,
      }),
    )
    .optional(),
});

export const roomInputSchema = z.object({
  name: z.string().trim().min(3).max(255),
});
