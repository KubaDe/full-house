import { beforeEach, describe, expect, it, vi } from "vitest";

import { SplitView } from "../splitView";
import { render, screen } from "@/testUtils/render";

const content = {
  sideContent: {
    title: "Chat",
    description: "Chat with others",
    value: <div>Side Content</div>,
  },
  mainContent: <div>Main Content</div>,
  setIsOpen: () => {},
};

describe("SplitView - Desktop", () => {
  it("should render side content when open", async () => {
    render(<SplitView {...content} isOpen={true} />);
    expect(screen.getByText("Main Content")).toBeVisible();
    expect(screen.getByText("Side Content")).toBeVisible();
  });

  it("should not render side content when closed", async () => {
    render(<SplitView {...content} isOpen={false} />);
    expect(screen.getByText("Main Content")).toBeVisible();
    expect(screen.queryByText("Side Content")).toBeNull();
  });
});

describe("SplitView - Mobile", () => {
  beforeEach(() => {
    vi.mock("@/components/uiKit/hooks/use-mobile", async () => ({
      ...(await vi.importActual("@/components/uiKit/hooks/use-mobile")),
      useIsMobile: vi.fn().mockImplementation(() => {
        return true;
      }),
    }));
  });

  it("should render side content when open", async () => {
    render(<SplitView {...content} isOpen={true} />);
    expect(screen.getByText("Main Content")).toBeVisible();
    expect(screen.getByText("Side Content")).toBeVisible();
  });

  it("should not render side content when closed", async () => {
    render(<SplitView {...content} isOpen={false} />);
    expect(screen.getByText("Main Content")).toBeVisible();
    expect(screen.queryByText("Side Content")).toBeNull();
  });
});
