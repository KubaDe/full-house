"use client";
import { type ReactNode, useEffect } from "react";
import { show as showModal } from "@ebay/nice-modal-react";
import { api } from "@repo/api/client";
import { EditProfileModal } from "../modals/editProfileModal";

const useForceToFillProfile = () => {
  const { data: userData } = api.me.userQuery.useQuery();

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
