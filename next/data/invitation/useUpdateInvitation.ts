import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useUpdateInvitation = () => {
  const [updateInvitationLoading, setUpdateInvitationLoading] = useState(false);
  const [updateInvitationError, setUpdateInvitationError] = useState("");
  const updateInvitation = async (invitation_id: number) => {
    setUpdateInvitationError("");
    setUpdateInvitationLoading(true);
    const requestConfig = {
      url: "/api/invitation/update",
      method: "PUT",
      data: { invitation_id },
    };
    return api(requestConfig as any)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setUpdateInvitationError);
      })
      .finally(() => {
        setUpdateInvitationLoading(false);
      });
  };

  return {
    updateInvitation,
    updateInvitationError,
    updateInvitationLoading,
  };
};
