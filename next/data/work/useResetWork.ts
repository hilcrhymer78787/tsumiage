import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;

export const useResetWork = () => {
  const { errHandler } = useErrHandler();
  const [resetWorkLoading, setResetWorkLoading] = useState(false);
  const [resetWorkError, setResetWorkError] = useState("");
  const resetWork = async () => {
    setResetWorkError("");
    setResetWorkLoading(true);
    return api({
      url: "/api/work/reset",
      method: "DELETE",
    })
      .then((res: ApiRes) => {
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setResetWorkError);
      })
      .finally(() => {
        setResetWorkLoading(false);
      });
  };

  return {
    resetWork,
    resetWorkError,
    resetWorkLoading,
  };
};
