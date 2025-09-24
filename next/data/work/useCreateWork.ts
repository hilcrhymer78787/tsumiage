import { useCallback, useState } from "react";

import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
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
        setSnackbar("活動情報の更新に失敗しました", "error");
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
