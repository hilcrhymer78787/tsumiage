import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { useSnackbar } from "../common/useSnackbar";
import { AxiosResponse } from "axios";
import { Success } from "../types/Success";
type Request = {
  ids: number[];
};
export const useSortTasks = () => {
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const sortTasks = async (data: Request) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/task/sort",
      method: "POST",
      data,
    })
      .then((res: AxiosResponse<Success>) => {
        setSnackbar(res.data.data.message);
        return res;
      })
      .catch((err) => {
        setSnackbar("タスクの順番変更に失敗しました", "error");
        errHandler(err, setError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    sortTasks,
    error,
    isLoading,
  };
};
