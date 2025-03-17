import { MenuRooms } from "./menuRooms";
import { MenuAccount } from "./menuAccount";
import { MenuRoom } from "./menuRoom";
import { Menubar } from "@repo/ui-kit/menubar";

export const Menu = () => {
  return (
    <Menubar>
      <MenuAccount />
      <MenuRooms />
      <MenuRoom />
    </Menubar>
  );
};
