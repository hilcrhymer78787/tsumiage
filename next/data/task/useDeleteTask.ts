import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { useSnackbar } from "../common/useSnackbar";
import { Success } from "../types/Success";

export const useDeleteTask = () => {
  const { setSnackbar } = useSnackbar();
  const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);
  const [deleteTaskError, setDeleteTaskError] = useState("");
  const deleteTask = async (id: number) => {
    setDeleteTaskError("");
    setDeleteTaskLoading(true);
    return api({
      url: "/api/task/delete",
      method: "DELETE",
      data: { id },
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
