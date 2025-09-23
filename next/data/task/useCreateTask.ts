import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { useSnackbar } from "@/data/common/useSnackbar";
import { AxiosResponse } from "axios";
type Request = {
  id?: number;
  name: string;
};
type Response = {
  data: {
    message: string;
    success: boolean;
    status: number;
  };
};
export const useCreateTask = () => {
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
      .then((res: AxiosResponse<Response>) => {
        setSnackbar(res.data.data.message);
        return res;
      })
      .catch((err) => {
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
