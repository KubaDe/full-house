import { z } from "zod";

export const userToTheRoomInvitationsQueryInputSchema = z.object({
  roomId: z.string(),
});

export const userToTheRoomInvitationsQueryOutputSchema = z.array(
  z.object({
    id: z.string(),
    email: z.string(),
  }),
);
