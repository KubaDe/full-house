import { z } from "zod";

export const inviteUserToRoomMutationInputSchema = z.object({
  roomId: z.string(),
  userEmail: z.string().max(255).email().optional(),
  isOpen: z.boolean().optional(),
});

export const inviteUserToRoomMutationOutputSchema = z.object({
  id: z.string(),
});
