import { z } from "zod";

export const roomOpenInvitationQueryInputSchema = z.object({
  roomId: z.string(),
});

export const roomOpenInvitationQueryOutputSchema = z
  .object({
    id: z.string(),
    link: z.string(),
  })
  .nullish();
