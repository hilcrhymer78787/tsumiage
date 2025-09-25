import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { useSnackbar } from "../common/useSnackbar";
import { Success } from "@/data/types/success";

import { ApiErr } from "@/data/types/apiErr";
type Request = {
  id: number;
};
export const useDeleteTask = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);
  const [deleteTaskError, setDeleteTaskError] = useState("");
  const deleteTask = async (data: Request) => {
    setDeleteTaskError("");
    setDeleteTaskLoading(true);
    return api({
      url: "/api/task/delete",
      method: "DELETE",
      data,
    })
      .then((res: AxiosResponse<Success>) => {
        setSnackbar(res.data.data.message);
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setDeleteTaskError);
      })
      .finally(() => {
        setDeleteTaskLoading(false);
      });
  };

  return {
    deleteTask,
    deleteTaskError,
    deleteTaskLoading,
  };
};
