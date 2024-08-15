import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";
import { participantsOutputSchema } from "@/modules/room/schemas/participantsSchema";

export const participantsQuery = protectedProcedure
  .input(z.object({ roomId: z.string(), includeMe: z.boolean().optional().default(true) }))
  .output(participantsOutputSchema)
  .use(async (opts) => {
    const canAccess = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
        isOwner: true,
      },
    });

    if (!canAccess) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You can't access this room",
      });
    }

    return opts.next();
  })
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
