"use client";
import { type ReactNode, useEffect } from "react";
import { show as showModal } from "@ebay/nice-modal-react";
import { api } from "@/utils/api";
import { EditProfileModal } from "@/components/modals/editProfileModal";

const useForceToFillProfile = () => {
  const { data: userData } = api.me.user.useQuery();

  useEffect(() => {
    if (userData && !userData?.profile) {
      void showModal(EditProfileModal, { canClose: false });
    }
  }, [userData]);
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  useForceToFillProfile();
  return children;
};
