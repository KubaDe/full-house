import { SignOutButton } from "@clerk/nextjs";
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
        <SignOutButton redirectUrl={auth.buildSignInUrl()}>
          <MenubarItem>Logout</MenubarItem>
        </SignOutButton>
      </MenubarContent>
    </MenubarMenu>
  );
};
