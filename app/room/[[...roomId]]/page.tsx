"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useInterval } from "react-use";
import { Button } from "@/components/uiKit/button";
import { api } from "@/utils/api";
import { sessionTypeSchema } from "@/modules/session/schemas/sessionType";
import { inputEventTypeSchema } from "@/modules/event/schemas/inputEvent";

const Room = () => {
  const params = useParams<{ roomId: string[] }>();
  const roomId = params?.roomId?.[0] ?? "";

  const { mutateAsync: resetSessions } = api.session.resetSessionsMutation.useMutation();
  const { mutateAsync: createSession } = api.session.createSessionMutation.useMutation();
  const { mutateAsync: pushEvent } = api.event.pushInputEventMutation.useMutation();
  const { data: roomData } = api.room.userRoomQuery.useQuery({ roomId }, { enabled: !!roomId });

  const sessionId = roomData?.room?.sessions?.find(
    (session) => session.type === sessionTypeSchema.enum.simpleMessage,
  )?.id;

  const { data: activeParticipantsData } = api.session.roomAggregatedActiveParticipantsQuery.useQuery({
    roomId,
  });

  const { data: joinedParticipants } = api.session.roomAggregatedJoinedParticipantsQuery.useQuery({ roomId });

  useEffect(() => {
    if (sessionId) {
      void pushEvent({ sessionId, type: inputEventTypeSchema.enum.join });
    }
  }, [pushEvent, sessionId]);

  useInterval(() => {
    if (sessionId) {
      void pushEvent({ sessionId, type: inputEventTypeSchema.enum.ping });
    }
  }, 10000);
  return (
    <section>
      <Button
        className="absolute right-12 top-12"
        onClick={() => {
          void resetSessions({ roomId });
        }}
      >
        Reset session
      </Button>
      <Button
        className="absolute right-12 top-24"
        onClick={() => {
          void createSession({ roomId, type: sessionTypeSchema.enum.simpleMessage });
        }}
      >
        Create session
      </Button>
      <div className="flex w-full flex-col items-center">
        <div>Active participants:</div>
        {activeParticipantsData?.map((participant) => <div key={participant}>{participant}</div>)}
        <div>Joined participants:</div>
        {joinedParticipants?.map((participant) => <div key={participant}>{participant}</div>)}
      </div>
    </section>
  );
};

export default Room;
