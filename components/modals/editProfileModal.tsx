import { DialogHeader } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { useModal, create as createModal } from "@ebay/nice-modal-react";
import theme from "tailwindcss/defaultTheme";
import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/uiKit/dialog";
import { Button } from "@/components/uiKit/button";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/uiKit/drawer";
import { ScrollArea } from "@/components/uiKit/scroll-area";
import { useEditProfileForm, type UseEditProfileFormProps } from "@/components/forms/editProfileForm";

type EditProfileModalProps = UseEditProfileFormProps;

export const EditProfileModal = createModal(
  ({ onSave = () => {}, onInvalid = () => {} }: EditProfileModalProps) => {
    const { visible, show, hide } = useModal();
    const { formUI, formName } = useEditProfileForm({ onSave, onInvalid });
    const isDialog = useMediaQuery({ minWidth: theme.screens.md });

    if (isDialog) {
      return (
        <Dialog open={visible} onOpenChange={(value) => (value ? show() : hide())}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Choose your avatar and nickname</DialogDescription>
            </DialogHeader>
            {formUI}
            <DialogFooter>
              <Button type="submit" form={formName}>
                Save profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <Drawer open={visible} onOpenChange={(value) => (value ? show() : hide())}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>Choose your avatar and nickname</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="overflow-y-auto">
            <div className="px-4 pb-8">{formUI}</div>
          </ScrollArea>
          <DrawerFooter>
            <Button type="submit" form={formName}>
              Save profile
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
);
