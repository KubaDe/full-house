import { describe, expect, it } from "vitest";
import { PersonBadge } from "../personBadge";
import { render, screen } from "@/testUtils/render";

const profileMock = {
  name: "John Smith",
  id: "test-id",
};

describe("PersonBadge", () => {
  it("should render person badge with ", async () => {
    render(<PersonBadge profile={profileMock} />);
    expect(screen.getByLabelText("Avatar with name")).toHaveTextContent(
      "John Smith",
    );
  });

  it("should render person badge with name and avatar", async () => {
    render(
      <PersonBadge profile={profileMock} isJoined={true} isActive={false} />,
    );
    expect(screen.getByTestId("statusDot")).toHaveAttribute(
      "aria-label",
      "Inactive",
    );
  });

  it("should render person badge with name and avatar", async () => {
    render(
      <PersonBadge profile={profileMock} isJoined={true} isActive={true} />,
    );
    expect(screen.getByTestId("statusDot")).toHaveAttribute(
      "aria-label",
      "Present",
    );
  });

  it("should render person badge with name and avatar", async () => {
    render(
      <PersonBadge profile={profileMock} isJoined={false} isActive={false} />,
    );
    expect(screen.getByTestId("statusDot")).toHaveAttribute(
      "aria-label",
      "Absent",
    );
  });
});
