import { ClerkProvider } from "@clerk/nextjs";
import { type ReactNode } from "react";

type AuthProviderProps = { children: ReactNode };
export const AuthProvider = ({ children }: AuthProviderProps) => {
  if (process.env.NEXT_PUBLIC_MOCKED_USER_ID) {
    return children;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
};
