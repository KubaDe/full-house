import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "sonner";
import { type z } from "zod";
import { SendIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/uiKit/form";
import { Input } from "@/components/uiKit/input";
import { api } from "@/utils/api";
import { handleFormSubmitServerErrors } from "@/lib/handleFormSubmitServerErrors";
import { messageEventSchema } from "@/modules/event/schemas/inputEvent/chat/messageEvent";
import { inputEventTypeSchema } from "@/modules/event/schemas/inputEvent";
import { Button } from "@/components/uiKit/button";

type UseMessageFormProps = {
  onSuccess?: () => void;
  onError?: () => void;
  onInvalid?: () => void;
  sessionId: string;
};

const formName = "messageForm";

const formSchema = messageEventSchema.pick({ message: true });

type FormValues = z.infer<typeof formSchema>;

export const useMessageForm = ({ onSuccess, onError, onInvalid, sessionId }: UseMessageFormProps) => {
  const { mutate: pushInputEvent, ...mutationParams } = api.event.pushInputEventMutation.useMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    pushInputEvent(
      { sessionId, type: inputEventTypeSchema.enum.message, ...values },
      {
        onError: (error) => {
          toast.error(error.message ?? "Failed to send a message", { richColors: true });
          handleFormSubmitServerErrors({ form, error });
          onError?.();
        },
        onSuccess: () => {
          onSuccess?.();
          form.reset();
        },
      },
    );
  }, onInvalid);

  const formUI = (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex content-center items-start gap-2 p-4" id={formName}>
        <FormField
          control={form.control}
          name="message"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Type a message" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="aspect-square size-9 p-0" type="submit" aria-label="Send message">
          <SendIcon size={16} />
        </Button>
      </form>
    </Form>
  );
  return { form, formUI, formName, mutationParams };
};
