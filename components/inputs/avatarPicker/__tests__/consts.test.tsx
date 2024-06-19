import { expect, it, describe } from "vitest";
import { avatarPickerInputSchema } from "../consts";
import * as avatarPickerMock from "../__mocks__/avatarPicker.mock";

describe("AvatarPicker => const", () => {
  describe("avatarPickerInputSchema", () => {
    it("should validate correct avatar", () => {
      const { success } = avatarPickerInputSchema.safeParse(avatarPickerMock.avatar);
      expect(success).toBe(true);
    });

    it("should validate incorrect avatar", () => {
      const { success, error } = avatarPickerInputSchema.safeParse({
        ...avatarPickerMock.avatar,
        body: avatarPickerMock.avatar.accessory[0],
        face: avatarPickerMock.avatar.body[0],
      });
      expect(success).toBe(false);
      expect(error?.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ message: "Incorrect face type", path: ["face"] }),
          expect.objectContaining({ message: "Incorrect body type", path: ["body"] }),
        ]),
      );
    });
  });
});
