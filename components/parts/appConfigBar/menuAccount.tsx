import { show as showModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { CountBadge } from "./countBadge";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/uiKit/menubar";
import { useMe } from "@/modules/user/hooks/useMe";
import { EditProfileModal } from "@/components/modals/editProfileModal";
import { InvitationsModal } from "@/components/modals/invitationsModal";
import { api } from "@/utils/api";

export const MenuAccount = () => {
  const { auth } = useMe();
  const queryClient = useQueryClient();

  const { data: myInvitationsData } = api.invitation.myInvitationsQuery.useQuery();

  const countItems = myInvitationsData?.length ?? 0;

  return (
    <MenubarMenu>
      <MenubarTrigger data-testid="menu.account">
        Account
        {countItems > 0 && <CountBadge>{myInvitationsData?.length}</CountBadge>}
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem data-testid="menu.account.editProfile" onClick={() => showModal(EditProfileModal)}>
          Edit profile
        </MenubarItem>
        <MenubarItem
          data-testid="menu.account.invitations"
          onClick={() => showModal(InvitationsModal)}
          disabled={countItems === 0}
        >
          Invitations
          {countItems > 0 && <CountBadge>{myInvitationsData?.length}</CountBadge>}
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => auth.signOut()?.then(() => queryClient.resetQueries())}>
          Logout
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
