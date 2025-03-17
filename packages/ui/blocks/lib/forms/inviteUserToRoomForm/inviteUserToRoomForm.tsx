"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "sonner";
import { type z } from "zod";
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
import { inviteUserToRoomMutationInputSchema } from "@repo/schemas";
import { Label } from "@repo/ui-kit/label";

type UseInviteUserToRoomFormProps = {
  roomId: string;
  onSuccess?: () => void;
  onError?: () => void;
  onInvalid?: () => void;
};

const formName = "inviteUserForm";

const formSchema = inviteUserToRoomMutationInputSchema.omit({ roomId: true });

export const useInviteUserToRoomForm = ({
  roomId,
  onSuccess,
  onError,
  onInvalid,
}: UseInviteUserToRoomFormProps) => {
  const { mutate: inviteUser, ...mutationParams } =
    api.invitation.inviteUserToRoomMutation.useMutation();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    inviteUser(
      { roomId, ...values },
      {
        onError: (error) => {
          toast.error(error.message ?? "Failed to invite the user", {
            richColors: true,
          });
          handleFormSubmitServerErrors({ form, error });
          onError?.();
        },
        onSuccess: () => {
          toast.success("User invited successfully!");
          void utils.invitation.userToRoomInvitationsQuery.invalidate();
          onSuccess?.();
          form.reset();
        },
      },
    );
  }, onInvalid);

  const formUI = (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8" id={formName}>
        <FormField
          control={form.control}
          name="userEmail"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="userEmail">User&#39;s email</Label>
              <FormControl>
                <Input
                  placeholder="john.smith@gmail.com"
                  id="userEmail"
                  {...field}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="sr-only">
          Invite user
        </button>
      </form>
    </Form>
  );
  return { form, formUI, formName, mutationParams };
};
