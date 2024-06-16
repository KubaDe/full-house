import { expect, vi, it, describe } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { get } from "lodash";
import { defaultAvatar, partsOptions } from "../consts";
import { AvatarPicker } from "../avatarPicker";
import * as avatarPickerTestUtils from "./avatarPicker.testUtils";

describe("AvatarPicker", () => {
  it.each(["face", "body", "facialHair", "hair", "accessory"])("should change %s", (part) => {
    cleanup();
    const onChange = vi.fn();
    render(<AvatarPicker onChange={onChange} defaultValue={defaultAvatar} />);

    fireEvent.click(avatarPickerTestUtils.selectNextPart(part));
    expect(onChange).toHaveBeenLastCalledWith({
      ...defaultAvatar,
      [part]: get(partsOptions, `[${part}][1]`),
    });

    fireEvent.click(avatarPickerTestUtils.selectNextPart(part));
    expect(onChange).toHaveBeenLastCalledWith({
      ...defaultAvatar,
      [part]: get(partsOptions, `[${part}][2]`),
    });

    fireEvent.click(avatarPickerTestUtils.selectPreviousPart(part));
    expect(onChange).toHaveBeenLastCalledWith({
      ...defaultAvatar,
      [part]: get(partsOptions, `[${part}][1]`),
    });
  });
});
