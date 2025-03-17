import { protectedProcedure } from "../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@repo/db";
import {
  participantsQueryOutputSchema,
  participantsQueryInputSchema,
} from "@repo/schemas";
export const participantsQuery = protectedProcedure
  .input(participantsQueryInputSchema)
  .output(participantsQueryOutputSchema)
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
            id: true,
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
    const participants = userRoom.map((userRoom) => userRoom.user);
    return participantsQueryOutputSchema.safeParse(participants).data;
  });
