import { z } from "zod";
import { sessionTypeSchema } from "../sessionType";

export const createSessionMutationInputSchema = z.object({
  roomId: z.string(),
  type: sessionTypeSchema,
});
export const createSessionMutationOutputSchema = z.undefined();
