"use client";
import { Plus } from "lucide-react";
import { show as showModal } from "@ebay/nice-modal-react";
import { api } from "@/utils/api";
import { Button } from "@/components/uiKit/button";
import { InviteUserToRoomModal } from "@/components/modals/inviteUserToRoomModal";
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/components/uiKit/hover-card";
import { Badge } from "@/components/uiKit/badge";

type AddParticipantButtonProps = {
  roomId: string;
};

export const AddParticipantButton = ({ roomId }: AddParticipantButtonProps) => {
  const { data: userToTheRoomInvitationsData } = api.invitation.userToRoomInvitationsQuery.useQuery({
    roomId,
  });
  const pendingInvitationsCount = userToTheRoomInvitationsData?.length ?? 0;
  const pendingLabel = pendingInvitationsCount > 9 ? "9+" : pendingInvitationsCount;
  return (
    <div className="relative">
      <Button
        className="size-8 rounded-full p-0"
        variant="outline"
        aria-label="Add participant"
        onClick={() => void showModal(InviteUserToRoomModal, { roomId })}
      >
        <Plus size={20} />
      </Button>
      {pendingInvitationsCount > 0 && (
        <HoverCard closeDelay={500}>
          <HoverCardTrigger asChild>
            <Button
              aria-label="pending invitations counter"
              className="absolute right-[-8px] top-[-8px] size-[20px] rounded-full p-0 text-[10px] font-bold"
              variant="default"
            >
              {pendingLabel}
            </Button>
          </HoverCardTrigger>
          <HoverCardPortal>
            <HoverCardContent className="w-80" aria-label="Pending invitationon">
              <h2 className="text-lg">Invited people</h2>
              <p className="text-xs text-muted-foreground">
                People who received an invitation to join this room
              </p>
              <div
                className="mt-3 flex flex-wrap content-start items-start justify-center gap-1"
                aria-label="invitations list"
              >
                {userToTheRoomInvitationsData?.map((invitation) => (
                  <Badge key={invitation.id}>{invitation.email}</Badge>
                ))}
              </div>
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCard>
      )}
    </div>
  );
};
