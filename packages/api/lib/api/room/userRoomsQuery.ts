import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { db } from "@repo/db";
import { userRoomOutputSchema } from "@repo/schemas";
import { paginationInputSchema, paginationOutputSchema } from "@repo/schemas";
export const userRoomsQuery = protectedProcedure
  .input(paginationInputSchema)
  .output(
    paginationOutputSchema.extend({
      items: z.array(userRoomOutputSchema),
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
      items: userRooms.map((userRoom) => userRoomOutputSchema.parse(userRoom)),
    };
  });
