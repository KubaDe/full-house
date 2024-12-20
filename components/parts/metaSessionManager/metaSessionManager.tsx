"use client";
import { type ReactNode, useEffect } from "react";
import { useInterval } from "react-use";
import { match, P } from "ts-pattern";
import { api } from "@/utils/api";
import { sessionTypeSchema } from "@/modules/session/schemas/sessionType";
import { inputEventTypeSchema } from "@/modules/event/schemas/inputEvent";
import { FullPageSpinner } from "@/components/uiKit/fullPageSpinner";
import { NoMetaSessionModal } from "@/components/modals/noMetaSessionModal";

type MetaSessionManagerProps = {
  roomId: string;
  children: ReactNode;
};

export const MetaSessionManager = ({ roomId, children }: MetaSessionManagerProps) => {
  const { data: roomData, isFetching } = api.room.userRoomQuery.useQuery({ roomId }, { enabled: !!roomId });

  const { mutateAsync: pushEvent } = api.event.pushInputEventMutation.useMutation();

  const metaSessionId = roomData?.room?.sessions?.find(
    (session) => session.type === sessionTypeSchema.enum.meta,
  )?.id;

  useEffect(() => {
    if (metaSessionId) {
      void pushEvent({ sessionId: metaSessionId, type: inputEventTypeSchema.enum.join });
    }
  }, [pushEvent, metaSessionId]);

  useInterval(() => {
    if (metaSessionId) {
      void pushEvent({ sessionId: metaSessionId, type: inputEventTypeSchema.enum.ping });
    }
  }, 10000);

  return match([metaSessionId, isFetching])
    .with([P.nullish, false], () => <NoMetaSessionModal roomId={roomId} />)
    .with([P.any, true], () => <FullPageSpinner />)
    .otherwise(() => <>{children}</>);
};
