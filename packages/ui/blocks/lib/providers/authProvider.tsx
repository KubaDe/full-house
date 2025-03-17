"use client";
import { ClerkProvider, RedirectToSignIn, SignedOut } from "@clerk/nextjs";
import { type ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "@repo/ui-hooks/user";

type WatcherProps = { children: ReactNode };
const Watcher = ({ children }: WatcherProps) => {
  const { isSignedIn } = useMe();
  const queryClient = useQueryClient();

  useEffect(() => {
    void queryClient.invalidateQueries();
  }, [isSignedIn, queryClient]);

  return children;
};

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  if (process.env.NEXT_PUBLIC_MOCKED_USER_ID) {
    return children;
  }
  return (
    <ClerkProvider>
      <Watcher>{children}</Watcher>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
};
