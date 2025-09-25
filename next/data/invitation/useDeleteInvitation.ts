import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { ApiErr } from "@/data/types/apiErr";
type Request = {
  invitation_id: number;
};
export const useDeleteInvitation = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const deleteInvitation = async (data:Request) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/delete",
      method: "DELETE",
      data,
    })
      .then((res) => {
        return res;
      })
      .catch((err: ApiErr) => {
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
