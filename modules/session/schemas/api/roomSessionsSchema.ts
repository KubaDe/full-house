import { z } from "zod";
import { sessionTypeSchema } from "@/modules/session/schemas/sessionType";

export const roomSessionsQueryInputSchema = z.object({ roomId: z.string() });

export const roomSessionsQueryOutputSchema = z
  .array(
    z.object({
      id: z.string(),
      type: sessionTypeSchema,
      createdAt: z.date(),
    }),
  )
  .default([]);
