import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "sonner";
import { AvatarPicker } from "@/components/inputs/avatarPicker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/uiKit/form";
import { Input } from "@/components/uiKit/input";
import { api } from "@/utils/api";
import { handleFormSubmitServerErrors } from "@/lib/handleFormSubmitServerErrors";
import { defaultAvatar } from "@/modules/user/consts/avatarConsts";
import { type Profile, profileSchema } from "@/modules/user/schemas/profileSchema";

type UseEditProfileFormProps = {
  onSuccess?: () => void;
  onError?: () => void;
  onInvalid?: () => void;
};

const formName = "editProfileForm";

export const useEditProfileForm = ({ onSuccess, onError, onInvalid }: UseEditProfileFormProps = {}) => {
  const { mutate: updateProfile, ...mutationParams } = api.me.updateProfile.useMutation();
  const [userData] = api.me.user.useSuspenseQuery(undefined, {});
  const utils = api.useUtils();

  const form = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: userData?.profile ?? {
      name: "",
      avatar: defaultAvatar,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    updateProfile(
      { avatar: values.avatar, name: values.name },
      {
        onError: (error) => {
          toast.error("Failed to update profile");
          handleFormSubmitServerErrors({ form, error });
          onError?.();
        },
        onSuccess: ({ profile }) => {
          toast.success("Profile updated successfully!");
          void utils.me.user.invalidate();
          onSuccess?.();
          form.reset(profile ?? undefined);
        },
      },
    );
  }, onInvalid);

  const formUI = (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8" id={formName}>
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
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>This is your public displayed name and avatar</FormDescription>
            </FormItem>
          )}
        />
        <button type="submit" className="sr-only">
          Save profile
        </button>
      </form>
    </Form>
  );
  return { form, formUI, formName, mutationParams };
};
