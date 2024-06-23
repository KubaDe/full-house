import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/uiKit/menubar";

export const MenuAccount = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger>Account</MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled>Edit Profile</MenubarItem>
        <MenubarSeparator />
        <MenubarItem disabled>Logout</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
