import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {
  id: number;
};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;
export const useDeleteWork = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const deleteWork = async (data: ApiReq) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/work/delete",
      method: "DELETE",
      data,
    })
      .then((res: ApiRes) => {
        // setSnackbar(res.data.data.message);
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
    deleteWork,
    error,
    isLoading,
  };
};
