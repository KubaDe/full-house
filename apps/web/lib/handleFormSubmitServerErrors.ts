import {
  type FieldValues,
  type UseFormReturn,
  type FieldPath,
} from "react-hook-form";
import { type TRPCClientErrorLike } from "@trpc/client";
import { first } from "lodash-es";
import { type t } from "@/server/trpc";

export const handleFormSubmitServerErrors = <T extends FieldValues>(props: {
  form: UseFormReturn<T>;
  error: TRPCClientErrorLike<typeof t>;
}) => {
  const { error, form } = props;
  Object.entries(error?.data?.zodError?.fieldErrors ?? {}).forEach(
    ([field, error]) => {
      form.setError(field as FieldPath<T>, {
        type: "manual",
        message: first(error),
      });
    },
  );
  return error?.data?.zodError?.formErrors;
};
