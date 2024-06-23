import { Menubar } from "@/components/uiKit/menubar";
import { MenuRooms } from "@/components/parts/appConfigBar/menuRooms";
import { MenuAccount } from "@/components/parts/appConfigBar/menuAccount";

export const Menu = () => {
  return (
    <Menubar>
      <MenuAccount />
      <MenuRooms />
    </Menubar>
  );
};
