import { z } from "zod";

export const resetSessionsMutationInputSchema = z.object({
  roomId: z.string(),
});
export const resetSessionsMutationOutputSchema = z.undefined();
