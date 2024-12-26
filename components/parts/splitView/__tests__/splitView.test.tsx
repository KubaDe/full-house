import { describe, expect, it } from "vitest";

import { SplitView } from "../splitView";
import { render, screen } from "@/testUtils/render";

const content = {
  sideContent: <div>Side Content</div>,
  mainContent: <div>Main Content</div>,
  setIsOpen: () => {},
};

describe("SplitView", () => {
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
