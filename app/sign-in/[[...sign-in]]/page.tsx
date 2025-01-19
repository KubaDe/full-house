"use client";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMe } from "@/modules/user/hooks/useMe";

export default function Page() {
  const { replace } = useRouter();
  const { userData } = useMe();

  useEffect(() => {
    if (userData) {
      replace("/");
    }
  }, [replace, userData]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignIn />
    </div>
  );
}
