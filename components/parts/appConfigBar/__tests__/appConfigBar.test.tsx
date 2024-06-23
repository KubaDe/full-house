import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { within } from "@storybook/test";
import { userEvent } from "@testing-library/user-event";
import { AppConfigBar } from "@/components/parts/appConfigBar";

describe("AppConfigBar - MVP", () => {
  it("should render avatar in app config bar", async () => {
    render(<AppConfigBar />);
    const avatar = screen.getByLabelText("Avatar");
    await userEvent.hover(avatar);
    const hoverCard = await screen.findByLabelText("About me info");
    expect(within(hoverCard).getByText("Hardcoded Name")).toBeDefined();
    expect(within(hoverCard).getByText("hardcoded@email.com")).toBeDefined();
    expect(within(hoverCard).getByText("Joined December 2021")).toBeDefined();
  });
});
