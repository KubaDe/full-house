import { describe, expect, it } from "vitest";

import { fireEvent } from "@testing-library/react";
import { RoomSplitView } from "../roomSplitView";
import { useRoomSplitView } from "../useRoomSplitView";
import { render, screen, waitFor } from "@/testUtils/render";
import { featureTypeSchema } from "@/components/parts/roomSplitView/consts";

describe("RoomSplitView", () => {
  it("should render only main content initially", async () => {
    render(<RoomSplitView>Page content</RoomSplitView>);
    expect(screen.getByTestId("splitView.mainContent")).toBeInTheDocument();
    expect(screen.getByTestId("splitView.mainContent")).toHaveTextContent("Page content");
    expect(screen.queryByTestId("splitView.sideContent")).toBeNull();
  });

  it("should open side content when clicking mode button", async () => {
    render(<RoomSplitView>Page content</RoomSplitView>);
    fireEvent.click(screen.getByTestId("roomSplitView.modeButton.chat"));
    expect(await screen.findByTestId("splitView.sideContent")).toBeVisible();
  });

  it("should close side content when clicking active mode button ", async () => {
    useRoomSplitView.setState({ isOpen: true, activeFeature: featureTypeSchema.enum.chat });
    render(<RoomSplitView>Page content</RoomSplitView>);
    expect(await screen.findByTestId("splitView.sideContent")).toBeVisible();
    fireEvent.click(screen.getByTestId("roomSplitView.modeButton.chat"));
    await waitFor(() => {
      expect(screen.queryByTestId("splitView.sideContent")).toBeNull();
    });
  });

  it("should render all modes buttons", async () => {
    render(<RoomSplitView>Page content</RoomSplitView>);
    const buttons = screen.getAllByTestId(/roomSplitView.modeButton/);
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveAttribute("data-testid", "roomSplitView.modeButton.poll");
    expect(buttons[1]).toHaveAttribute("data-testid", "roomSplitView.modeButton.chat");
  });

  describe("side content", () => {
    it.each(["poll", "chat"])("%s content should be rendered properly", async (mode) => {
      render(<RoomSplitView>Page content</RoomSplitView>);
      fireEvent.click(screen.getByTestId(`roomSplitView.modeButton.${mode}`));
      expect(await screen.findByTestId(`roomSplitView.sideContent.${mode}`)).toBeVisible();
    });
  });
});
