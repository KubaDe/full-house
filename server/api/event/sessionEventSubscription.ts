import { observable } from "@trpc/server/observable";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@/server/db/prisma";
import { rdsSub } from "@/server/db/redis";
import { deserializePublishToOutputEvent } from "@/modules/event/utils/deserializePublishToOutputEvent";
import { sessionEventSubscriptionInputSchema } from "@/modules/event/schemas/api";

export const sessionEventSubscription = protectedProcedure
  .input(sessionEventSubscriptionInputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .subscription(async (opts) => {
    const userRoom = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
      },
      include: {
        room: {
          include: {
            sessions: true,
          },
        },
      },
    });
    const sessionIds = userRoom?.room?.sessions?.map((session) => session.id) ?? [];
    const channels = sessionIds.map((sessionId) => `outputEvents:${sessionId}`) ?? [];

    if (channels.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No sessions found" });
    }
    void rdsSub.subscribe(...channels);
    return observable((emit) => {
      rdsSub.on("message", (_: string, message: string) => {
        const messageObj = deserializePublishToOutputEvent(message);
        if (messageObj && sessionIds.includes(messageObj?.sessionId)) {
          emit.next(messageObj);
        }
      });

      return () => {
        void rdsSub.unsubscribe(...channels);
      };
    });
  });
