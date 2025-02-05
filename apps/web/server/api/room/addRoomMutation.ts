import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";
import {
  userRoomInputSchema,
  userRoomOutputSchema,
} from "@/modules/room/schemas/userRoomSchema";

export const addRoomMutation = protectedProcedure
  .input(userRoomInputSchema)
  .output(userRoomOutputSchema.nullish())
  .use(async (opts) => {
    const existingUserOwnedRoomsCount = await db.usersOnRooms.count({
      where: {
        userId: opts.ctx.user.id,
        isOwner: true,
      },
    });

    if (existingUserOwnedRoomsCount >= 10) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "You can't create more than 10 rooms",
      });
    }
    return opts.next();
  })
  .mutation(async ({ ctx, input }) => {
    const room = await db.room.create({
      data: {
        name: input.room.name,
        users: {
          create: {
            userId: ctx.user.id,
            isOwner: true,
          },
        },
      },
    });
    const userRoom = await db.usersOnRooms.findUnique({
      where: {
        userId_roomId: {
          userId: ctx.user.id,
          roomId: room.id,
        },
      },
      include: {
        room: true,
      },
    });
    return userRoom;
  });
