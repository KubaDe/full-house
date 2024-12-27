import { type ReactNode } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/uiKit/resizable";
import { useIsMobile } from "@/components/uiKit/hooks/use-mobile";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/uiKit/sheet";

type SplitViewProps = {
  mainContent: ReactNode;
  sideContent: {
    title: string;
    description: string;
    value: ReactNode;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const SplitView = ({ mainContent, sideContent, setIsOpen, isOpen }: SplitViewProps) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <>
        {mainContent}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className="flex flex-col gap-8">
            <SheetHeader aria-describedby="Additional content">
              <SheetTitle>{sideContent.title}</SheetTitle>
              <SheetDescription>{sideContent.description}</SheetDescription>
            </SheetHeader>
            {sideContent.value}
          </SheetContent>
        </Sheet>
      </>
    );
  }
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel
        className="relative"
        minSize={50}
        defaultSize={75}
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
            {sideContent.value}
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
};
