import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/uiKit/form";
import { Input } from "@/components/uiKit/input";
import { api } from "@/utils/api";
import { handleFormSubmitServerErrors } from "@/lib/handleFormSubmitServerErrors";
import { type UserRoomInput, userRoomInputSchema } from "@/modules/room/schemas/userRoomSchema";

type UseAddRoomFormProps = {
  onSuccess?: () => void;
  onError?: () => void;
  onInvalid?: () => void;
};

const formName = "addRoomForm";

export const useAddRoomForm = ({ onSuccess, onError, onInvalid }: UseAddRoomFormProps = {}) => {
  const { mutate: addRoom, ...mutationParams } = api.userRoom.addRoom.useMutation();
  const utils = api.useUtils();

  const form = useForm<UserRoomInput>({
    resolver: zodResolver(userRoomInputSchema),
    defaultValues: {
      room: {
        name: "",
      },
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    addRoom(values, {
      onError: (error) => {
        toast.error(error.message ?? "Failed to add a new room", { richColors: true });
        handleFormSubmitServerErrors({ form, error });
        onError?.();
      },
      onSuccess: () => {
        toast.success("Room added successfully!");
        void utils.userRoom.myRooms.invalidate();
        onSuccess?.();
        form.reset();
      },
    });
  }, onInvalid);

  const formUI = (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8" id={formName}>
        <FormField
          control={form.control}
          name="room.name"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Room name" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="sr-only">
          Add room
        </button>
      </form>
    </Form>
  );
  return { form, formUI, formName, mutationParams };
};
