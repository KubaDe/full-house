import { z } from "zod";

export const inviteUserToRoomMutationInputSchema = z.object({
  roomId: z.string(),
  userEmail: z.string().max(255).email(),
});
export const inviteUserToRoomMutationOutputSchema = z.object({
  id: z.string(),
});
