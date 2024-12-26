"use client";
import { type ReactNode } from "react";
import { ChartColumnBigIcon, MessageCircleMore } from "lucide-react";
import { match } from "ts-pattern";
import { SplitView } from "../splitView";
import { ModeButton } from "./modeButton";
import { SideContentModePickerWrapper } from "./sideContentModePickerWrapper";
import { useRoomSplitView } from "./useRoomSplitView";
import { featureTypeSchema } from "@/components/parts/roomSplitView/consts";

type RoomSplitViewProps = {
  children: ReactNode;
};

export const RoomSplitView = ({ children }: RoomSplitViewProps) => {
  const { isOpen, setIsOpen, goToFeature, activeFeature } = useRoomSplitView();

  const sideContent = match(activeFeature)
    .with(featureTypeSchema.enum.chat, () => <div data-testid="roomSplitView.sideContent.chat">chat</div>)
    .with(featureTypeSchema.enum.poll, () => <div data-testid="roomSplitView.sideContent.poll">poll</div>)
    .exhaustive();

  return (
    <SplitView
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      sideContent={sideContent}
      mainContent={
        <>
          {children}
          <SideContentModePickerWrapper>
            <ModeButton
              onClick={() => goToFeature(featureTypeSchema.enum.poll)}
              isActive={activeFeature === featureTypeSchema.enum.poll}
              isSidebarOpen={isOpen}
              Icon={ChartColumnBigIcon}
              name="poll"
            />
            <ModeButton
              onClick={() => goToFeature(featureTypeSchema.enum.chat)}
              isActive={activeFeature === featureTypeSchema.enum.chat}
              isSidebarOpen={isOpen}
              Icon={MessageCircleMore}
              name="chat"
            />
          </SideContentModePickerWrapper>
        </>
      }
    />
  );
};
