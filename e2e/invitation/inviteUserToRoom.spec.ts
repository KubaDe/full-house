import { test as base } from "@playwright/test";
import { Account } from "@/e2e/fixtures/account";
import { Room } from "@/e2e/fixtures/room";

const test = base.extend<{}, { invited: Account; inviting: Account; room: Room }>({
  inviting: [
    async ({ browser }, use) => {
      const inviting = new Account();
      await inviting.init({ browser });
      await use(inviting);
      await inviting.cleanup();
    },
    { scope: "worker", auto: true },
  ],
  invited: [
    async ({ browser }, use) => {
      const inviting = new Account();
      await inviting.init({ browser });
      await use(inviting);
      await inviting.cleanup();
    },
    { scope: "worker", auto: true },
  ],
  room: [
    async ({ inviting }, use) => {
      const room = new Room();
      await room.init();
      await room.stateHelpers.addUser(inviting.stateHelpers.userId);
      await use(room);
      await room.cleanup();
    },
    { scope: "worker", auto: true },
  ],
});

test.describe.serial("Invite user to room", () => {
  test("Inviting user sends invitation", async ({ inviting, room, invited }) => {
    await inviting.page.goto(`/room/${room.stateHelpers.roomId}`);
    await inviting.page.getByTestId("addParticipant").click();
    await inviting.page.locator("[name='userEmail']").fill(invited.testUserEmail);
    await inviting.page.locator("button[form='inviteUserForm']").click();
    await inviting.page.waitForResponse("**/api/trpc/invitation.inviteUserToRoomMutation");
  });

  test("Invited user receives invitation", async ({ invited, room }) => {
    await invited.page.goto("/");
    await invited.page.getByTestId("menu.account").click();
    await invited.page.getByTestId("menu.account.invitations").click();
    await invited.page.getByTestId(`acceptInvitation.room_${room.stateHelpers.roomId}`).click();
    await invited.page.getByTestId("confirmationModal.confirmAction").click();
    await invited.page.waitForResponse("**/api/trpc/invitation.respondInvitationMutation");
  });

  test("Invited user joins the room", async ({ invited, room }) => {
    await invited.page.goto(`/room/${room.stateHelpers.roomId}`);
    await test.expect(invited.page.getByTestId("menu.room")).toHaveText("Test room");
  });
});
