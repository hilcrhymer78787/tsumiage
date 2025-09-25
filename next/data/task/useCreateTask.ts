import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useSnackbar } from "@/data/common/useSnackbar";
import { AxiosResponse } from "axios";
import { Success } from "@/data/types/success";
import { ApiErr } from "@/data/types/apiErr";
type Request = {
  id?: number;
  name: string;
};
export const useCreateTask = () => {
  const { errHandler } = useErrHandler();
  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  const { setSnackbar } = useSnackbar();
  const [createTaskError, setCreateTaskError] = useState("");
  const [nameError, setNameError] = useState("");
  const createTask = async (data: Request) => {
    setCreateTaskError("");
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
      .then((res: AxiosResponse<Success>) => {
        setSnackbar(res.data.data.message);
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setCreateTaskError);
      })
      .finally(() => {
        setCreateTaskLoading(false);
      });
  };

  return {
    createTask,
    createTaskError,
    createTaskLoading,
    nameError,
  };
};
