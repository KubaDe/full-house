import { ClipboardIcon } from "lucide-react";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/uiKit/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/uiKit/tooltip";
import { Button } from "@/components/uiKit/button";
import { api } from "@/utils/api";

type CopyInvitationLinkCardProps = {
  roomId: string;
};
export const CopyInvitationLinkCard = ({
  roomId,
}: CopyInvitationLinkCardProps) => {
  const { data: roomOpenInvitation } =
    api.invitation.roomOpenInvitationQuery.useQuery({
      roomId,
    });

  if (!roomOpenInvitation) {
    return null;
  }

  return (
    <Alert>
      <AlertDescription>
        <div className="text-center">
          Everyone with this link will be able to join the room:
        </div>
        <TooltipProvider>
          <Tooltip>
            <CopyToClipboard
              text={roomOpenInvitation.link}
              onCopy={() => {
                toast.success("Link copied to clipboard");
              }}
            >
              <TooltipTrigger asChild className="mt-4 w-full">
                <Button
                  variant="outline"
                  className="w-full"
                  id="copyInviteLink"
                >
                  Copy link to clipboard
                  <ClipboardIcon className="ml-2 size-4" />
                </Button>
              </TooltipTrigger>
            </CopyToClipboard>
            <TooltipContent>{roomOpenInvitation.link}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDescription>
    </Alert>
  );
};
