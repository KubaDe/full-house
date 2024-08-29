import React from "react";
import { useOpenUserToRoomInvitationForm } from "@/components/forms/openUserToRoomInvitationForm";
import { CopyInvitationLinkCard } from "@/components/parts/inviteUserToRoomTabs/copyInvitationLinkCard";

type OpenInvitationCardProps = {
  roomId: string;
  onSuccess: () => void;
};
export const OpenInvitationCard = ({ roomId }: OpenInvitationCardProps) => {
  const { formUI } = useOpenUserToRoomInvitationForm({
    roomId,
  });

  return (
    <div className="flex flex-col gap-2">
      {formUI}
      <CopyInvitationLinkCard roomId={roomId} />
    </div>
  );
};
