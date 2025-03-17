import { show as showModal } from "@ebay/nice-modal-react";
import { ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@repo/ui-kit/menubar";
import { api } from "@repo/api/client";
import { ConfirmActionModal } from "../../modals";

export const MenuRoom = () => {
  const params = useParams<{ roomId: string[] }>();
  const { replace } = useRouter();
  const roomId = params?.roomId?.[0] ?? "";

  const { data: roomData } = api.room.userRoomQuery.useQuery(
    { roomId },
    { enabled: !!roomId },
  );
  const { room } = api.useUtils();

  const { mutateAsync: deleteRoom } = api.room.deleteRoomMutation.useMutation({
    onSuccess: async () => {
      replace("/");
      toast.success("Room removed successfully!");
    },
    onSettled: async () => {
      await room.userRoomsQuery.invalidate();
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to remove the room", {
        richColors: true,
      });
    },
  });

  const { mutateAsync: leaveRoom } = api.room.leaveRoomMutation.useMutation({
    onSuccess: async () => {
      replace("/");
    },
    onSettled: async () => {
      await room.userRoomsQuery.invalidate();
      toast.success("Room vacated successfully!");
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to leave the room", {
        richColors: true,
      });
    },
  });

  if (!roomData) {
    return null;
  }

  const ownerOptions = [
    <MenubarItem
      data-testid="menu.room.delete"
      key="delete"
      onClick={() =>
        showModal(ConfirmActionModal, {
          title: "Delete room",
          description: "Are you sure you want to delete this room?",
          onConfirm: () => deleteRoom({ roomId }),
        })
      }
    >
      Delete room
    </MenubarItem>,
  ];

  const memberOptions = [
    <MenubarItem
      data-testid="menu.room.leave"
      key="leave"
      onClick={() =>
        showModal(ConfirmActionModal, {
          title: "Leave room",
          description: "Are you sure you want to leave this room?",
          onConfirm: () => leaveRoom({ roomId }),
        })
      }
    >
      Leave room
    </MenubarItem>,
  ];

  return (
    <>
      <ChevronRight className="size-4" />

      <MenubarMenu>
        <MenubarTrigger data-testid="menu.room">
          {roomData.room.name}
        </MenubarTrigger>
        <MenubarContent>
          {roomData.isOwner && ownerOptions}
          {memberOptions}
        </MenubarContent>
      </MenubarMenu>
    </>
  );
};
