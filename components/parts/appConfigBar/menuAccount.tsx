import { show as showModal } from "@ebay/nice-modal-react";
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

  const { data: myInvitationsData } = api.invitation.myInvitationsQuery.useQuery();

  const countItems = myInvitationsData?.length ?? 0;

  return (
    <MenubarMenu>
      <MenubarTrigger>
        Account
        {countItems > 0 && <CountBadge>{myInvitationsData?.length}</CountBadge>}
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={() => showModal(EditProfileModal)}>Edit profile</MenubarItem>
        <MenubarItem onClick={() => showModal(InvitationsModal)} disabled={countItems === 0}>
          Invitations
          {countItems > 0 && <CountBadge>{myInvitationsData?.length}</CountBadge>}
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => auth.signOut()}>Logout</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
