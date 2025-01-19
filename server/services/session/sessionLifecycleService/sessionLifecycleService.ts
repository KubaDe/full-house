import { db } from "@/server/db/prisma";
import { inputEventService } from "@/server/services/event/inputEventService";
import { type SessionType } from "@/modules/session/schemas/sessionType";

type CreateSessionProps = {
  roomId: string;
  userId: string;
  type: SessionType;
};

const createSession = async ({ type, roomId, userId }: CreateSessionProps) => {
  const { id } = await db.session.create({
    data: {
      roomId,
      type,
    },
  });

  await inputEventService.onCreate({
    sessionId: id,
    roomId,
    userId,
  });
};

export const sessionLifecycleService = {
  createSession,
};
