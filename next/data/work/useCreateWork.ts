import { useCallback, useState } from "react";

import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { WorkState } from "@/data/types/work";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {
  state: WorkState;
  date: string;
  task_id: number;
};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;
export const useCreateWork = () => {
  const { errHandler } = useErrHandler();
  const [createWorkLoading, setCreateWorkLoading] = useState(false);
  const [createWorkError, setCreateWorkError] = useState("");
  const createWork = async (data: ApiReq) => {
    setCreateWorkError("");
    setCreateWorkLoading(true);
    return api({
      url: "/api/work/create",
      method: "POST",
      data,
    })
      .then((res: ApiRes) => {
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setCreateWorkError);
      })
      .finally(() => {
        setCreateWorkLoading(false);
      });
  };

  return {
    createWork,
    createWorkError,
    createWorkLoading,
  };
};
