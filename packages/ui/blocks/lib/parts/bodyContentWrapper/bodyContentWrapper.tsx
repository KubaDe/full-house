"use client";
import { type ReactNode } from "react";

import { HeartCrack } from "lucide-react";
import { api } from "@repo/api/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui-kit/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui-kit/alert";

type BodyContentWrapperProps = { children: ReactNode };
export const BodyContentWrapper = ({ children }: BodyContentWrapperProps) => {
  const { data: statusData } = api.status.statusQuery.useQuery(undefined);
  const hasError =
    statusData && (!statusData.database || !statusData.api || !statusData.rds);
  if (hasError) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error occurred</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild className="text-primary">
            <Alert>
              <HeartCrack className="size-4" />
              <AlertTitle>Service Unavailable</AlertTitle>
              <AlertDescription>
                The app could not load the data. Please try again later.
              </AlertDescription>
            </Alert>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  return children;
};
