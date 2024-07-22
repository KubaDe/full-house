import { z } from "zod";
import { roomSchema } from "@/modules/room/schemas/roomSchema";
export const userRoomSchema = z.object({
  room: roomSchema,
  alias: z.string().trim().min(3).max(255).nullable(),
  isOwner: z.boolean().nullable(),
});

export const userRoomInputSchema = z.object({
  room: z.object({
    name: z.string().trim().min(3).max(255),
  }),
});

export type UserRoomInput = z.infer<typeof userRoomInputSchema>;
