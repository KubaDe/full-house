"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui-kit/form";
import { Input } from "@repo/ui-kit/input";
import { api } from "@repo/api/client";
import { handleFormSubmitServerErrors } from "../utils/handleFormSubmitServerErrors";
import { type UserRoomInput, userRoomInputSchema } from "@repo/schemas";
type UseAddRoomFormProps = {
  onSuccess?: () => void;
  onError?: () => void;
  onInvalid?: () => void;
};

const formName = "addRoomForm";

export const useAddRoomForm = ({
  onSuccess,
  onError,
  onInvalid,
}: UseAddRoomFormProps = {}) => {
  const { mutate: addRoom, ...mutationParams } =
    api.room.addRoomMutation.useMutation();
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
        toast.error(error.message ?? "Failed to add a new room", {
          richColors: true,
        });
        handleFormSubmitServerErrors({ form, error });
        onError?.();
      },
      onSuccess: () => {
        toast.success("Room added successfully!");
        void utils.room.userRoomsQuery.invalidate();
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
