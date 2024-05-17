import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useDeleteInvitation = () => {
  const [deleteInvitationLoading, setDeleteInvitationLoading] = useState(false);
  const [deleteInvitationError, setDeleteInvitationError] = useState("");
  const deleteInvitation = async (invitation_id: number) => {
    setDeleteInvitationError("");
    setDeleteInvitationLoading(true);
    const requestConfig = {
      url: "/api/invitation/delete",
      method: "DELETE",
      data: { invitation_id },
    };
    return api(requestConfig as any)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setDeleteInvitationError);
      })
      .finally(() => {
        setDeleteInvitationLoading(false);
      });
  };

  return {
    deleteInvitation,
    deleteInvitationError,
    deleteInvitationLoading,
  };
};
