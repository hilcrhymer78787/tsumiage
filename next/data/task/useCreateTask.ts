import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useSnackbar } from "@/data/common/useSnackbar";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {
  id?: number;
  name: string;
};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;
export const useCreateTask = () => {
  const { errHandler } = useErrHandler();
  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  const { setSnackbar } = useSnackbar();
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const createTask = async (data: ApiReq) => {
    setError("");
    setNameError("");
    let isError = false;
    if (!data.name) {
      setNameError("名前は必須です");
      isError = true;
    }
    if (isError) return;
    setCreateTaskLoading(true);
    return api({
      url: "/api/task/create",
      method: "POST",
      data,
    })
      .then((res: ApiRes) => {
        setSnackbar(res.data.data.message);
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setError, true);
      })
      .finally(() => {
        setCreateTaskLoading(false);
      });
  };

  return {
    createTask,
    error,
    createTaskLoading,
    nameError,
  };
};
