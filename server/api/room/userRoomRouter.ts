import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";
import { db } from "@/server/db/prisma";
import { userRoomInputSchema, userRoomSchema } from "@/modules/room/schemas/userRoomSchema";
import { paginationInputSchema, paginationOutputSchema } from "@/modules/utils/schemas/pagination";

export const userRoomRouter = router({
  myRooms: protectedProcedure
    .input(paginationInputSchema)
    .output(
      paginationOutputSchema.extend({
        items: z.array(userRoomSchema),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { take, skip } = input;
      const [total, userRooms] = await db.$transaction([
        db.usersOnRooms.count({
          where: { userId: ctx.user.id },
        }),
        db.usersOnRooms.findMany({
          take,
          skip,
          where: { userId: ctx.user.id },
          include: {
            room: true,
          },
          orderBy: {
            assignedAt: "desc",
          },
        }),
      ]);

      return {
        skip,
        take,
        total,
        items: userRooms.map((userRoom) => userRoomSchema.parse(userRoom)),
      };
    }),
  addRoom: protectedProcedure
    .input(userRoomInputSchema)
    .output(userRoomSchema.nullish())
    .mutation(async ({ ctx, input }) => {
      const existingUserOwnedRoomsCount = await db.usersOnRooms.count({
        where: {
          userId: ctx.user.id,
          isOwner: true,
        },
      });

      if (existingUserOwnedRoomsCount >= 10) {
        throw new Error("You can't create more than 10 rooms");
      }

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
    }),
});
