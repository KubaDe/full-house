import { show as showModal } from "@ebay/nice-modal-react";
import { UserCog } from "lucide-react";
import { isEmpty } from "lodash";
import { useParams } from "next/navigation";
import Link from "next/link";
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
  const { data: userRoomsData } = api.room.userRoomsQuery.useQuery({ skip: 0, take: ROOMS_NUMBER });
  const params = useParams<{ roomId: string[] }>();
  const roomId = params?.roomId?.[0] ?? "";

  return (
    <MenubarMenu>
      <MenubarTrigger>Rooms</MenubarTrigger>
      <MenubarContent>
        {!isEmpty(userRoomsData?.items) && (
          <>
            <MenubarRadioGroup value={roomId}>
              {userRoomsData?.items.map((userRoom) => (
                <Link href={`/room/${userRoom.room.id}`} key={userRoom.room.id}>
                  <MenubarRadioItem key={userRoom.room.id} value={userRoom.room.id}>
                    {userRoom.room.name}
                    {userRoom.isOwner && (
                      <MenubarShortcut data-testid="owner">
                        <UserCog size={16} />
                      </MenubarShortcut>
                    )}
                  </MenubarRadioItem>
                </Link>
              ))}
            </MenubarRadioGroup>

            {(userRoomsData?.total ?? 0) > ROOMS_NUMBER && (
              <>
                <MenubarSeparator />
                <MenubarItem disabled inset>
                  Show all rooms...
                </MenubarItem>
              </>
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
