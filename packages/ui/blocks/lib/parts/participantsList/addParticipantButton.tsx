"use client";
import { Plus } from "lucide-react";
import { show as showModal } from "@ebay/nice-modal-react";
import { api } from "@repo/api/client";
import { Button } from "@repo/ui-kit/button";
import { InviteUserToRoomModal } from "../../modals";
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@repo/ui-kit/hover-card";
import { Badge } from "@repo/ui-kit/badge";
import { useCurrentRoom } from "@repo/ui-hooks/room";

export const AddParticipantButton = () => {
  const { roomId } = useCurrentRoom();
  const { data: userToTheRoomInvitationsData } =
    api.invitation.userToRoomInvitationsQuery.useQuery(
      {
        roomId,
      },
      {
        select: (data) => data?.filter((invitation) => !invitation.isOpen),
        enabled: !!roomId,
      },
    );
  const pendingInvitationsCount = userToTheRoomInvitationsData?.length ?? 0;
  const pendingLabel =
    pendingInvitationsCount > 9 ? "9+" : pendingInvitationsCount;
  return (
    <div className="flex">
      <div className="relative">
        <Button
          data-testid="addParticipant"
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
              <HoverCardContent aria-label="Pending invitationon">
                <h2 className="text-lg">Invited people</h2>
                <p className="text-xs text-muted-foreground">
                  People who received an invitation to join this room
                </p>
                <ul
                  className="mt-3 flex w-full flex-col gap-1"
                  aria-label="invitations list"
                >
                  {userToTheRoomInvitationsData?.map((invitation) => (
                    <li key={invitation.id}>
                      <Badge
                        className="w-full max-w-full justify-center"
                        variant="secondary"
                      >
                        <div className="overflow-hidden text-ellipsis">
                          {invitation.email}
                        </div>
                      </Badge>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCardPortal>
          </HoverCard>
        )}
      </div>
    </div>
  );
};
