import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { useSnackbar } from "../common/useSnackbar";
import { Success } from "@/data/types/success";

type Request = {
  id: number;
};
export const useDeleteTask = () => {
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
      .catch((err) => {
        setSnackbar("タスクの削除に失敗しました", "error");
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
