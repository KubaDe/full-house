import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/uiKit/menubar";
import { useMe } from "@/modules/user/hooks/useMe";

export const MenuAccount = () => {
  const { auth } = useMe();
  return (
    <MenubarMenu>
      <MenubarTrigger>Account</MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled>Edit Profile</MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => auth.signOut({ redirectUrl: auth.buildSignInUrl() })}>Logout</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
