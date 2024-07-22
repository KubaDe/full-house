import { show as showModal } from "@ebay/nice-modal-react";
import { UserCog } from "lucide-react";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/uiKit/menubar";
import { AddRoomModal } from "@/components/modals/addRoomModal";
import { api } from "@/utils/api";

const ROOMS_NUMBER = 5;

export const MenuRooms = () => {
  const { data: userRoomsData } = api.userRoom.myRooms.useQuery({ skip: 0, take: ROOMS_NUMBER });
  return (
    <MenubarMenu>
      <MenubarTrigger>Rooms</MenubarTrigger>
      <MenubarContent>
        {userRoomsData?.items && (
          <>
            <MenubarRadioGroup value="benoit">
              {userRoomsData.items.map((userRoom) => (
                <MenubarRadioItem key={userRoom.room.id} value="userRoom.room.id">
                  {userRoom.room.name}
                  {userRoom.isOwner && (
                    <MenubarShortcut>
                      <UserCog size={16} />
                    </MenubarShortcut>
                  )}
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
            <MenubarSeparator />

            {(userRoomsData?.total ?? 0) > ROOMS_NUMBER && (
              <MenubarItem disabled inset>
                Show all rooms...
              </MenubarItem>
            )}

            <MenubarSeparator />
          </>
        )}
        <MenubarItem inset onClick={() => showModal(AddRoomModal)}>
          Add room...
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
