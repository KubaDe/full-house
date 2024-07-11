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
  DrawerClose,
} from "@/components/uiKit/drawer";
import { ScrollArea } from "@/components/uiKit/scroll-area";
import { useEditProfileForm } from "@/components/forms/editProfileForm";
import { ButtonSpinner } from "@/components/uiKit/buttonSpinner";
import { useMe } from "@/modules/user/hooks/useMe";

type EditProfileModalProps = {
  canClose?: boolean;
};

export const EditProfileModal = createModal(({ canClose = true }: EditProfileModalProps) => {
  const { userData } = useMe();
  const { visible, show, hide } = useModal();
  const {
    formUI,
    formName,
    form,
    mutationParams: { isPending },
  } = useEditProfileForm({
    onSuccess: hide,
  });
  const isDialog = useMediaQuery({ minWidth: theme.screens.md });
  const onOpenChange = (value: boolean) => (value ? show() : hide());

  const title = userData?.profile ? "Edit profile" : "Create profile";
  const disabled = !form.formState.isDirty || isPending;

  if (isDialog) {
    return (
      <Dialog open={visible} onOpenChange={userData?.profile ? onOpenChange : undefined}>
        <DialogContent canClose={canClose}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>Choose your avatar and nickname</DialogDescription>
            <DrawerClose />
          </DialogHeader>
          {formUI}
          <DialogFooter>
            <Button type="submit" form={formName} disabled={disabled}>
              <ButtonSpinner isLoading={isPending} />
              Save profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={visible} onOpenChange={onOpenChange} dismissible={canClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>Choose your avatar and nickname</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="overflow-y-auto">
          <div className="px-4 pb-8">{formUI}</div>
        </ScrollArea>
        <DrawerFooter>
          <Button type="submit" form={formName} disabled={disabled}>
            <ButtonSpinner isLoading={isPending} />
            Save profile
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
