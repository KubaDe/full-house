"use client";
import { useHoverDirty } from "react-use";
import { useRef } from "react";
import { api } from "@/utils/api";
import { PersonBadge } from "@/components/parts/personBadge";
import { AddParticipantButton } from "@/components/parts/participantsList/addParticipantButton";

type ParticipantsListProps = {
  roomId: string;
};

export const ParticipantsList = ({ roomId }: ParticipantsListProps) => {
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
    <div className="flex flex-col gap-2">
      <div ref={wrapperRef} className="flex flex-col gap-2">
        {participantsData?.map((participant) => (
          <PersonBadge
            key={participant.id}
            profile={participant.profile}
            avatar={participant.profile.avatar}
            isOpen={isHovering}
            isActive={activeParticipantsData?.includes(participant.id)}
            isJoined={joinedParticipants?.includes(participant.id)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <AddParticipantButton roomId={roomId} />
      </div>
    </div>
  );
};
