import { screen } from "@testing-library/react";

export const selectNextPart = (part: string) => {
  switch (part) {
    case "face":
      return screen.getByRole("button", { name: "Next face" });
    case "body":
      return screen.getByRole("button", { name: "Next body" });
    case "facialHair":
      return screen.getByRole("button", { name: "Next facial hair" });
    case "hair":
      return screen.getByRole("button", { name: "Next hair" });
    case "accessory":
      return screen.getByRole("button", { name: "Next accessory" });
    default:
      throw new Error(`Invalid part: ${part}`);
  }
};

export const selectPreviousPart = (part: string) => {
  switch (part) {
    case "face":
      return screen.getByRole("button", { name: "Previous face" });
    case "body":
      return screen.getByRole("button", { name: "Previous body" });
    case "facialHair":
      return screen.getByRole("button", { name: "Previous facial hair" });
    case "hair":
      return screen.getByRole("button", { name: "Previous hair" });
    case "accessory":
      return screen.getByRole("button", { name: "Previous accessory" });
    default:
      throw new Error(`Invalid part: ${part}`);
  }
};
