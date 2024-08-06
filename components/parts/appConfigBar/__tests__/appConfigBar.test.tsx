import { describe, expect, it, vi } from "vitest";
import { within } from "@storybook/test";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@/testUtils/render";
import { AppConfigBar } from "@/components/parts/appConfigBar";

vi.mock("@/modules/user/hooks/useMe");
vi.mock("next/navigation", async () => ({
  ...(await vi.importActual("next-router-mock")),
  useParams: vi.fn().mockImplementation(() => {
    return {};
  }),
}));

describe("AppConfigBar - MVP", () => {
  it("should render avatar in app config bar", async () => {
    render(<AppConfigBar />);
    const avatar = screen.getByLabelText("Avatar");
    await userEvent.hover(avatar);
    const hoverCard = await screen.findByLabelText("About me info");
    expect(within(hoverCard).getByText("Test User")).toBeDefined();
    expect(within(hoverCard).getByText("foo@bar.com")).toBeDefined();
    expect(within(hoverCard).getByText("Joined January 1, 2021")).toBeDefined();
  });
});
