import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";

export const useUpdateInvitation = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const updateInvitation = async (invitation_id: number) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/update",
      method: "PUT",
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
    updateInvitation,
    error,
    isLoading,
  };
};
