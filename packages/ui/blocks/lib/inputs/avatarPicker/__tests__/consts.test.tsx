import { expect, it, describe } from "vitest";
import * as avatarPickerMock from "../__mocks__/avatarPicker.mock";
import { avatarSchema } from "@repo/schemas";
describe("AvatarPicker => const", () => {
  describe("avatarPickerInputSchema", () => {
    it("should validate correct avatar", () => {
      const { success } = avatarSchema.safeParse(avatarPickerMock.avatar);
      expect(success).toBe(true);
    });

    it("should validate incorrect avatar", () => {
      const { success, error } = avatarSchema.safeParse({
        ...avatarPickerMock.avatar,
        body: avatarPickerMock.avatar.accessory[0],
        face: avatarPickerMock.avatar.body[0],
      });
      expect(success).toBe(false);
      expect(error?.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: "Incorrect face type",
            path: ["face"],
          }),
          expect.objectContaining({
            message: "Incorrect body type",
            path: ["body"],
          }),
        ]),
      );
    });
  });
});
