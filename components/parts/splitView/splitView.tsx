import { type ReactNode } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/uiKit/resizable";

type SplitViewProps = {
  mainContent: ReactNode;
  sideContent: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const SplitView = ({ mainContent, sideContent, setIsOpen, isOpen }: SplitViewProps) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel
        className="relative"
        defaultSize={75}
        minSize={50}
        id="mainContent"
        order={1}
        data-testid="splitView.mainContent"
      >
        {mainContent}
      </ResizablePanel>
      {isOpen && (
        <>
          <ResizableHandle />
          <ResizablePanel
            id="sideContent"
            order={2}
            minSize={25}
            defaultSize={25}
            collapsible
            collapsedSize={0}
            onCollapse={() => setIsOpen(false)}
            data-testid="splitView.sideContent"
          >
            {sideContent}
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
};
