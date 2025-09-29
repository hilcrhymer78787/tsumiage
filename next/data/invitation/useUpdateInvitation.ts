import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useSnackbar } from "../common/useSnackbar";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {
  invitation_id: number;
};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;
export const useUpdateInvitation = () => {
  const { setSnackbar } = useSnackbar();
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const updateInvitation = async (data: ApiReq) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/update",
      method: "PUT",
      data,
    })
      .then((res: ApiRes) => {
        setSnackbar(res.data.data.message);
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
    updateInvitation,
    error,
    isLoading,
  };
};
