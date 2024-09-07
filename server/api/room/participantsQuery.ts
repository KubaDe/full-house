import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@/server/db/prisma";
import { participantsOutputSchema } from "@/modules/room/schemas/participantsSchema";

export const participantsQuery = protectedProcedure
  .input(z.object({ roomId: z.string(), includeMe: z.boolean().optional().default(true) }))
  .output(participantsOutputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .query(async ({ input, ctx }) => {
    const { roomId } = input;
    const userRoom = await db.usersOnRooms.findMany({
      where: {
        roomId,
        user: {
          NOT: [
            {
              profile: null,
            },
            ...(input.includeMe ? [] : [{ id: ctx.user.id }]),
          ],
        },
      },
      select: {
        user: {
          select: {
            profile: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    const participants = userRoom.map((userRoom) => userRoom.user.profile);
    return participantsOutputSchema.safeParse(participants).data ?? [];
  });
