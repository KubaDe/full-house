"use client";
import { useHoverDirty } from "react-use";
import { useRef } from "react";
import { Plus } from "lucide-react";
import { api } from "@/utils/api";
import { PersonBadge } from "@/components/parts/personBadge";
import { Button } from "@/components/uiKit/button";

type ParticipantsListProps = {
  roomId: string;
};

export const ParticipantsList = ({ roomId }: ParticipantsListProps) => {
  const { data: participantsData } = api.room.participantsQuery.useQuery(
    { roomId, includeMe: false },
    { enabled: !!roomId },
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isHovering = useHoverDirty(wrapperRef);

  return (
    <div className="flex flex-col gap-2">
      <div ref={wrapperRef} className="flex flex-col gap-2">
        {participantsData?.map((participant) => (
          <PersonBadge
            key={participant.id}
            profile={participant}
            avatar={participant.avatar}
            isOpen={isHovering}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Button className="size-8 rounded-full p-0" variant="outline" disabled aria-label="Add participant">
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
};
