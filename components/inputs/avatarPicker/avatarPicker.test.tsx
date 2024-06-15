import { expect, vi, it, describe } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { get } from "lodash";
import * as avatarPickerTestUtils from "./avatarPicker.testUtils";
import { type Avatar, partsOptions } from "./consts";
import { AvatarPicker } from "./avatarPicker";

const defaultValue = {
  accessory: partsOptions.accessory[0],
  body: partsOptions.body[0],
  face: partsOptions.face[0],
  facialHair: partsOptions.facialHair[0],
  hair: partsOptions.hair[0],
} as Avatar;

describe("AvatarPicker", () => {
  it.each(["face", "body", "facialHair", "hair", "accessory"])("should change %s", (part) => {
    cleanup();
    const onChange = vi.fn();
    render(<AvatarPicker onChange={onChange} defaultValue={defaultValue} />);

    fireEvent.click(avatarPickerTestUtils.selectNextPart(part));
    expect(onChange).toHaveBeenLastCalledWith({
      ...defaultValue,
      [part]: get(partsOptions, `[${part}][1]`),
    });

    fireEvent.click(avatarPickerTestUtils.selectNextPart(part));
    expect(onChange).toHaveBeenLastCalledWith({
      ...defaultValue,
      [part]: get(partsOptions, `[${part}][2]`),
    });

    fireEvent.click(avatarPickerTestUtils.selectPreviousPart(part));
    expect(onChange).toHaveBeenLastCalledWith({
      ...defaultValue,
      [part]: get(partsOptions, `[${part}][1]`),
    });
  });
});
