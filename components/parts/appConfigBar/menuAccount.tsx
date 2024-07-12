import { show as showModal } from "@ebay/nice-modal-react";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/uiKit/menubar";
import { useMe } from "@/modules/user/hooks/useMe";
import { EditProfileModal } from "@/components/modals/editProfileModal";

export const MenuAccount = () => {
  const { auth } = useMe();
  return (
    <MenubarMenu>
      <MenubarTrigger>Account</MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={() => showModal(EditProfileModal)}>Edit Profile</MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => auth.signOut()}>Logout</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
