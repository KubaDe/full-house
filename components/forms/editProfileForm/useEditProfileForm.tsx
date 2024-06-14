import { Controller, useForm, type SubmitErrorHandler, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { AvatarPicker, avatarPickerInputSchema } from "@/components/inputs/avatarPicker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/uiKit/form";

import { Input } from "@/components/uiKit/input";

const editProfileFormSchema = z.object({
  avatar: avatarPickerInputSchema,
  name: z.string().min(2).max(50),
});

export type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;

export type UseEditProfileFormProps = {
  onSave: SubmitHandler<EditProfileFormValues>;
  onInvalid?: SubmitErrorHandler<EditProfileFormValues>;
};

const formName = "editProfileForm";

export const useEditProfileForm = ({ onSave, onInvalid }: UseEditProfileFormProps) => {
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: "foo",
      avatar: {
        body: "Turtleneck",
        face: "Awe",
        hair: "Bald",
        facialHair: "Dali",
        accessory: "None",
      },
    },
  });

  const formUI = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave, onInvalid)} className="space-y-8" id={formName}>
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <FormControl>
            <div className="flex flex-col items-center justify-center">
              <Controller
                render={(props) => <AvatarPicker {...props.field} />}
                name="avatar"
                control={form.control}
              />
              <FormDescription>This is your public display avatar.</FormDescription>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
  return { form, formUI, formName };
};
