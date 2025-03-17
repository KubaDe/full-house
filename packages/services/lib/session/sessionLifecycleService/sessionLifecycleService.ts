import { db } from "@repo/db";
import { SessionType } from "@repo/schemas";
import { inputEventService } from "../../event/inputEventService";

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
