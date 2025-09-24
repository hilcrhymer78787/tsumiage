import { useCallback, useState } from "react";

import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { WorkState } from "@/data/types/work";
import { useSnackbar } from "../common/useSnackbar";
import { AxiosResponse } from "axios";
import { Success } from "../types/success";

type workCreateData = {
  state: WorkState;
  date: string;
  task_id: number;
};
export const useCreateWork = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const [createWorkLoading, setCreateWorkLoading] = useState(false);
  const [createWorkError, setCreateWorkError] = useState("");
  const createWork = async (data: workCreateData) => {
    setCreateWorkError("");
    setCreateWorkLoading(true);
    return api({
      url: "/api/work/create",
      method: "POST",
      data,
    })
      .then((res: AxiosResponse<Success>) => {
        setSnackbar(res.data.data.message);
        return res;
      })
      .catch((err) => {
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
