import { Check, X } from "lucide-react";
import { show as showModal } from "@ebay/nice-modal-react";
import { toast } from "sonner";
import { TableCell, TableRow } from "@/components/uiKit/table";
import { api } from "@/utils/api";
import { Button } from "@/components/uiKit/button";
import { ConfirmActionModal } from "@/components/modals/confirmActionModal";
import { type MyInvitationsQueryOutput } from "@/modules/invitation/schemas/api/myInvitationsQuery";
import { ButtonSpinner } from "@/components/uiKit/buttonSpinner";

type MyInvitationsTableRowProps = {
  invitation: MyInvitationsQueryOutput[number];
};
export const MyInvitationsTableRow = ({ invitation }: MyInvitationsTableRowProps) => {
  const utils = api.useUtils();
  const { mutateAsync: respondInvitation, isPending } = api.invitation.respondInvitationMutation.useMutation({
    onSuccess: (_, { accept }) => {
      void utils.invitation.myInvitationsQuery.invalidate();
      void utils.invitation.userToRoomInvitationsQuery.invalidate();
      void utils.room.userRoomsQuery.invalidate();
      if (accept) {
        toast.success("Invitation accepted");
      } else {
        toast.warning("Invitation rejected", { richColors: true });
      }
    },
    onError: () => {
      toast.error("Failed to respond to invitation", { richColors: true });
    },
  });

  const acceptInvitation = (invitationId: string) => {
    void showModal(ConfirmActionModal, {
      title: "Accept invitation",
      description: "Are you sure you want to accept this invitation?",
      onConfirm: async () => respondInvitation({ invitationId, accept: true }),
      confirmButtonText: "Accept",
    });
  };

  const rejectInvitation = (invitationId: string) => {
    void showModal(ConfirmActionModal, {
      title: "Reject invitation",
      description: "Are you sure you want to reject this invitation?",
      onConfirm: async () => respondInvitation({ invitationId, accept: false }),
      confirmButtonText: "Reject",
      confirmButtonProps: { variant: "destructive" },
    });
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{invitation.room.name}</TableCell>
      <TableCell>{invitation.sender.email}</TableCell>
      <TableCell className="flex justify-end gap-1 text-right">
        <Button
          size="icon"
          className="size-6"
          onClick={() => acceptInvitation(invitation.id)}
          disabled={isPending}
          aria-label="Accept invitation"
          data-testid={`acceptInvitation.room_${invitation.room.id}`}
        >
          {isPending ? <ButtonSpinner isLoading /> : <Check size={16} />}
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="size-6"
          onClick={() => rejectInvitation(invitation.id)}
          disabled={isPending}
          aria-label="Reject invitation"
          data-testid={`rejectInvitation.room_${invitation.room.id}`}
        >
          {isPending ? <ButtonSpinner isLoading /> : <X size={16} />}
        </Button>
      </TableCell>
    </TableRow>
  );
};
