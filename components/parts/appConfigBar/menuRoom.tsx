import { show as showModal } from "@ebay/nice-modal-react";
import { ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/uiKit/menubar";
import { api } from "@/utils/api";
import { ConfirmActionModal } from "@/components/modals/confirmActionModal";

export const MenuRoom = () => {
  const params = useParams<{ roomId: string[] }>();
  const { replace } = useRouter();
  const roomId = params?.roomId?.[0] ?? "";

  const { data: roomData } = api.userRoom.myRoom.useQuery({ roomId }, { enabled: !!roomId });
  const { userRoom } = api.useUtils();

  const { mutateAsync: deleteRoom } = api.userRoom.deleteRoom.useMutation({
    onSuccess: async () => {
      replace("/");
    },
    onSettled: async () => {
      await userRoom.myRooms.invalidate();
    },
  });

  const { mutateAsync: leaveRoom } = api.userRoom.leaveRoom.useMutation({
    onSuccess: async () => {
      replace("/");
    },
    onSettled: async () => {
      await userRoom.myRooms.invalidate();
    },
  });

  if (!roomData) {
    return null;
  }

  const ownerOptions = [
    <MenubarItem
      key="delete"
      inset
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
      key="leave"
      inset
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
        <MenubarTrigger>{roomData.room.name}</MenubarTrigger>
        <MenubarContent>
          {roomData.isOwner && ownerOptions}
          {memberOptions}
        </MenubarContent>
      </MenubarMenu>
    </>
  );
};
