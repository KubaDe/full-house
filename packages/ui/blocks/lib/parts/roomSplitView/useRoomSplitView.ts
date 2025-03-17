import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type FeatureType, featureTypeSchema } from "./consts";

type RoomSplitViewState = {
  activeFeature: FeatureType;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleIsOpen: () => void;
  goToFeature: (feature: FeatureType) => void;
};

const version = 1;

export const useRoomSplitView = create(
  persist<RoomSplitViewState>(
    (set) => ({
      activeFeature: featureTypeSchema.enum.chat,
      isOpen: false,
      setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
      toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      goToFeature: (feature: FeatureType) =>
        set((state) =>
          feature === state.activeFeature && state.isOpen
            ? { isOpen: false }
            : { isOpen: true, activeFeature: feature },
        ),
    }),
    {
      version,
      name: "roomSplitViewState",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
