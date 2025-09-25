import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {
  invitation_id: number;
};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;
export const useDeleteInvitation = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const deleteInvitation = async (data: ApiReq) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/delete",
      method: "DELETE",
      data,
    })
      .then((res: ApiRes) => {
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
