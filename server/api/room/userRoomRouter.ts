import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../../trpc";
import { db } from "@/server/db/prisma";
import { userRoomInputSchema, userRoomOutputSchema } from "@/modules/room/schemas/userRoomSchema";
import { paginationInputSchema, paginationOutputSchema } from "@/modules/utils/schemas/pagination";
import { participantsOutputSchema } from "@/modules/room/schemas/participantsSchema";

export const userRoomRouter = router({
  myRooms: protectedProcedure
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
    }),

  myRoom: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .output(userRoomOutputSchema)
    .query(async ({ ctx, input }) => {
      const { roomId } = input;
      const userRoom = await db.usersOnRooms.findUnique({
        where: {
          userId_roomId: {
            userId: ctx.user.id,
            roomId,
          },
        },
        include: {
          room: true,
        },
      });
      if (!userRoom) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Room not found",
        });
      }
      return userRoom;
    }),

  participants: protectedProcedure
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
    }),

  addRoom: protectedProcedure
    .input(userRoomInputSchema)
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
    .output(userRoomOutputSchema.nullish())
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
    }),
  deleteRoom: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .use(async (opts) => {
      const canDelete = await db.usersOnRooms.findFirst({
        where: {
          userId: opts.ctx.user.id,
          roomId: opts.input.roomId,
          isOwner: true,
        },
      });

      if (!canDelete) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You can't delete this room",
        });
      }

      return opts.next();
    })
    .mutation(async ({ input }) => {
      const { roomId } = input;
      await db.room.delete({
        where: {
          id: roomId,
        },
      });
    }),
  leaveRoom: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .use(async (opts) => {
      const canLeave = await db.usersOnRooms.findFirst({
        where: {
          userId: opts.ctx.user.id,
          roomId: opts.input.roomId,
        },
      });

      if (!canLeave) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You can't leave this room",
        });
      }

      return opts.next();
    })
    .mutation(async ({ input, ctx }) => {
      const { roomId } = input;
      await db.usersOnRooms.deleteMany({
        where: {
          roomId,
          userId: ctx.user.id,
        },
      });
    }),
});
