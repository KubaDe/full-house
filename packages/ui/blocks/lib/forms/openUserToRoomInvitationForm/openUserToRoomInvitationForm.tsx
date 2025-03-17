"use client";

import React, { useCallback } from "react";
import { toast } from "sonner";
import { api } from "@repo/api/client";
import { SwitchCard } from "@repo/ui-kit/switchCard";

type UseOpenUserToRoomInvitationFormProps = {
  roomId: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export const useOpenUserToRoomInvitationForm = ({
  roomId,
  onSuccess,
  onError,
}: UseOpenUserToRoomInvitationFormProps) => {
  const { data: roomData } = api.room.userRoomQuery.useQuery({ roomId });
  const [roomOpenInvitationData, queryParams] =
    api.invitation.roomOpenInvitationQuery.useSuspenseQuery({
      roomId,
    });
  const { mutate: switchOpenInvitation, ...mutationParams } =
    api.invitation.switchOpenInvitationMutation.useMutation();
  const utils = api.useUtils();

  const checked = !!roomOpenInvitationData;

  const formName = "openUserToRoomInvitationForm";

  const onEnabledChange = useCallback(
    (value: boolean) => {
      switchOpenInvitation(
        { roomId, value },
        {
          onError: async (error) => {
            toast.error(error.message ?? "Failed to update open invitation", {
              richColors: true,
            });
            await utils.invitation.roomOpenInvitationQuery.invalidate();
            onError?.();
          },
          onSuccess: async () => {
            toast.success(
              value
                ? "Open invitation created successfully!"
                : "Open invitation disabled successfully!",
            );
            await utils.invitation.roomOpenInvitationQuery.invalidate();
            onSuccess?.();
          },
        },
      );
    },
    [
      onError,
      onSuccess,
      roomId,
      switchOpenInvitation,
      utils.invitation.roomOpenInvitationQuery,
    ],
  );

  const formUI = (
    <form className="space-y-4">
      <SwitchCard
        title="Open invitation"
        subtitle={
          roomData
            ? `Allow to join the "${roomData.room.name}" room for everybody with the link.`
            : ""
        }
        checked={checked}
        onCheckedChange={onEnabledChange}
        disabled={mutationParams.isPending || queryParams.isFetching}
      />
    </form>
  );
  return { formUI, formName, mutationParams };
};
