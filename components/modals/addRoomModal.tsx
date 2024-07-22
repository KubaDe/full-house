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
import { ButtonSpinner } from "@/components/uiKit/buttonSpinner";
import { useAddRoomForm } from "@/components/forms/addRoomForm";

export const AddRoomModal = createModal(() => {
  const { visible, show, hide } = useModal();
  const {
    formUI,
    formName,
    form,
    mutationParams: { isPending },
  } = useAddRoomForm({
    onSuccess: hide,
  });
  const isDialog = useMediaQuery({ minWidth: theme.screens.md });
  const onOpenChange = (value: boolean) => (value ? show() : hide());

  const title = "Add room";
  const subtitle = "Add a new room and invite your friends";
  const disabled = !form.formState.isDirty || isPending;

  if (isDialog) {
    return (
      <Dialog open={visible} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subtitle}</DialogDescription>
            <DrawerClose />
          </DialogHeader>
          {formUI}
          <DialogFooter>
            <Button type="submit" form={formName} disabled={disabled}>
              <ButtonSpinner isLoading={isPending} />
              Add room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={visible} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{subtitle}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="overflow-y-auto">
          <div className="px-4 pb-8">{formUI}</div>
        </ScrollArea>
        <DrawerFooter>
          <Button type="submit" form={formName} disabled={disabled}>
            <ButtonSpinner isLoading={isPending} />
            Add room
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
