import { z } from "zod";

export const switchOpenInvitationMutationInputSchema = z.object({
  roomId: z.string(),
  value: z.boolean(),
});

export const switchOpenInvitationMutationOutputSchema = z
  .object({
    id: z.string(),
  })
  .nullish();
