import React from "react";
import { useOpenUserToRoomInvitationForm } from "../../forms";
import { CopyInvitationLinkCard } from "./copyInvitationLinkCard";

type OpenInvitationCardProps = {
  roomId: string;
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
