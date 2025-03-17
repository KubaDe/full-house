"use client";
import { type ReactNode, useEffect } from "react";
import { useInterval } from "react-use";
import { match, P } from "ts-pattern";
import { api } from "@repo/api/client";
import { sessionTypeSchema, inputEventTypeSchema } from "@repo/schemas";
import { FullPageSpinner } from "@repo/ui-kit/fullPageSpinner";
import { NoMetaSessionModal } from "../../modals";
import { useCurrentRoom } from "@repo/ui-hooks/room";

type MetaSessionManagerProps = {
  children: ReactNode;
};

export const MetaSessionManager = ({ children }: MetaSessionManagerProps) => {
  const { roomId } = useCurrentRoom();
  const { data: roomData, isFetching } = api.room.userRoomQuery.useQuery(
    { roomId },
    { enabled: !!roomId },
  );

  const { mutateAsync: pushEvent } =
    api.event.pushInputEventMutation.useMutation();

  const metaSessionId = roomData?.room?.sessions?.find(
    (session) => session.type === sessionTypeSchema.enum.meta,
  )?.id;

  useEffect(() => {
    if (metaSessionId) {
      void pushEvent({
        sessionId: metaSessionId,
        type: inputEventTypeSchema.enum.join,
      });
    }
  }, [pushEvent, metaSessionId]);

  useInterval(() => {
    if (metaSessionId) {
      void pushEvent({
        sessionId: metaSessionId,
        type: inputEventTypeSchema.enum.ping,
      });
    }
  }, 10000);

  return match([metaSessionId, isFetching])
    .with([P.nullish, false], () => <NoMetaSessionModal roomId={roomId} />)
    .with([P.any, true], () => <FullPageSpinner />)
    .otherwise(() => <>{children}</>);
};
