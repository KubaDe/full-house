import { Controller, useForm, type SubmitErrorHandler, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { AvatarPicker, avatarPickerInputSchema, defaultAvatar } from "@/components/inputs/avatarPicker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/uiKit/form";

import { Input } from "@/components/uiKit/input";

const editProfileFormSchema = z.object({
  avatar: avatarPickerInputSchema,
  name: z.string().min(2).max(50),
});

type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;

export type UseEditProfileFormProps = {
  onSave: SubmitHandler<EditProfileFormValues>;
  onInvalid?: SubmitErrorHandler<EditProfileFormValues>;
  defaultValues?: EditProfileFormValues;
};

const formName = "editProfileForm";

export const useEditProfileForm = ({ onSave, onInvalid, defaultValues }: UseEditProfileFormProps) => {
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      avatar: defaultAvatar,
    },
  });

  const formUI = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave, onInvalid)} className="space-y-8" id={formName}>
        <FormItem>
          <FormControl>
            <div className="flex flex-col items-center justify-center">
              <Controller
                render={(props) => <AvatarPicker {...props.field} />}
                name="avatar"
                control={form.control}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>This is your public displayed name and avatar</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="sr-only">
          Save profile
        </button>
      </form>
    </Form>
  );
  return { form, formUI, formName };
};
