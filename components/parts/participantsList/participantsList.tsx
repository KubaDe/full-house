"use client";
import { useHoverDirty } from "react-use";
import { useRef } from "react";
import { api } from "@/utils/api";
import { PersonBadge } from "@/components/parts/personBadge";
import { AddParticipantButton } from "@/components/parts/participantsList/addParticipantButton";
import { useCurrentRoom } from "@/modules/room/hooks/useCurrentRoom";

export const ParticipantsList = () => {
  const { roomId } = useCurrentRoom();
  const { data: participantsData } = api.room.participantsQuery.useQuery(
    { roomId, includeMe: false },
    { enabled: !!roomId },
  );
  const { data: activeParticipantsData } = api.session.roomAggregatedActiveParticipantsQuery.useQuery({
    roomId,
  });

  const { data: joinedParticipants } = api.session.roomAggregatedJoinedParticipantsQuery.useQuery({ roomId });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isHovering = useHoverDirty(wrapperRef);

  return (
    <div className="flex flex-col gap-2" data-testid="participantList">
      <div ref={wrapperRef} className="flex flex-col gap-2">
        {participantsData?.map((participant) => (
          <div key={participant.id} data-testid={`participantList.${participant.id}`}>
            <PersonBadge
              profile={participant.profile}
              avatar={participant.profile.avatar}
              isOpen={isHovering}
              isActive={activeParticipantsData?.includes(participant.id)}
              isJoined={joinedParticipants?.includes(participant.id)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <AddParticipantButton />
      </div>
    </div>
  );
};
