import { vi, it, describe, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { useEditProfileForm } from "../useEditProfileForm";
import { fireEvent, screen, render, waitFor, renderHook } from "@/testUtils/render";
import * as avatarPickerMock from "@/components/inputs/avatarPicker/__mocks__/avatarPicker.mock";
import * as avatarPickerTestUtils from "@/components/inputs/avatarPicker/__tests__/avatarPicker.testUtils";
import { updateProfileMutationMock } from "@/server/api/user/__mocks__/updateProfileMutation.mock";
import { userQueryMock } from "@/server/api/user/__mocks__/userQuery.mock";

export const server = setupServer(userQueryMock.default());

describe("EditProfileForm", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should call submit when form is valid", async () => {
    const onSuccess = vi.fn();
    const updateMeProfileSpy = vi.fn();
    server.use(updateProfileMutationMock.default(updateMeProfileSpy));

    const { result } = renderHook(() => useEditProfileForm({ onSuccess }));
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    render(result.current.formUI);

    fireEvent.click(avatarPickerTestUtils.selectNextPart("face"));
    fireEvent.click(avatarPickerTestUtils.selectNextPart("body"));
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "John Smith" } });

    fireEvent.click(screen.getByText("Save profile"));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());

    expect(updateMeProfileSpy).toHaveBeenCalledWith({
      avatar: {
        ...avatarPickerMock.avatar,
        body: "Shirt",
        face: "Blank",
      },
      name: "John Smith",
    });
  });

  it("should call onInvalid when form is invalid", async () => {
    server.use(userQueryMock.noProfile());

    const onSuccess = vi.fn();
    const onInvalid = vi.fn();

    const { result } = renderHook(() => useEditProfileForm({ onSuccess, onInvalid }));
    await waitFor(() => expect(result.current.formUI).toBeDefined());
    render(result.current.formUI);

    fireEvent.click(screen.getByText("Save profile"));
    await waitFor(() => expect(onInvalid).toHaveBeenCalled());
    expect(onInvalid).toHaveBeenCalledWith(
      expect.objectContaining({
        name: expect.objectContaining({ type: "too_small" }) as {},
      }),
      expect.anything(),
    );
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
