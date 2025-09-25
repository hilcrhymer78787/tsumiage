import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useSnackbar } from "../common/useSnackbar";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {
  id: number;
};
type ApiRes = CmnRes<Success>
type ApiErr = CmnErr
export const useDeleteTask = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);
  const [deleteTaskError, setDeleteTaskError] = useState("");
  const deleteTask = async (data: ApiReq) => {
    setDeleteTaskError("");
    setDeleteTaskLoading(true);
    return api({
      url: "/api/task/delete",
      method: "DELETE",
      data,
    })
      .then((res: ApiRes) => {
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
