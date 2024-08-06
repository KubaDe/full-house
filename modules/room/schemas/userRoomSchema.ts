import { z } from "zod";
import { roomInputSchema, roomOutputSchema } from "@/modules/room/schemas/roomSchema";

export const userRoomOutputSchema = z.object({
  room: roomOutputSchema,
  alias: z.string().trim().min(3).max(255).nullable(),
  isOwner: z.boolean().nullable(),
});

export const userRoomInputSchema = z.object({
  room: roomInputSchema,
});

export type UserRoomInput = z.infer<typeof userRoomInputSchema>;
