import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";

export const useDeleteInvitation = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const deleteInvitation = async (invitation_id: number) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/delete",
      method: "DELETE",
      data: { invitation_id },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    deleteInvitation,
    error,
    isLoading,
  };
};
