import { z } from "zod";

export const respondMutationInputSchema = z.object({
  invitationId: z.string(),
  accept: z.boolean(),
});
export const respondMutationOutputSchema = z.undefined();
