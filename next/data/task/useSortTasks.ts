import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useSnackbar } from "../common/useSnackbar";
import { AxiosResponse } from "axios";
import { Success } from "@/data/types/success";
import { ApiErr } from "@/data/types/apiErr";
type Request = {
  ids: number[];
};
export const useSortTasks = () => {
  const { errHandler } = useErrHandler();
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
      .catch((err: ApiErr) => {
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
