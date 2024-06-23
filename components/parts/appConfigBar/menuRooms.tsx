import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/uiKit/menubar";

export const MenuRooms = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger>Rooms</MenubarTrigger>
      <MenubarContent>
        <MenubarRadioGroup value="benoit">
          <MenubarRadioItem value="andy" disabled>
            Planning
          </MenubarRadioItem>
          <MenubarRadioItem value="benoit" disabled>
            FE weekly
          </MenubarRadioItem>
          <MenubarRadioItem value="Luis" disabled>
            Knowledge transfer
          </MenubarRadioItem>
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarItem inset disabled>
          Add room...
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
