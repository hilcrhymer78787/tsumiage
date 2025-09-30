import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
import { useSnackbar } from "../common/useSnackbar";
type ApiReq = {};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;

export const useDeleteUser = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const deleteUser = async () => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/delete",
      method: "DELETE",
    })
      .then((res: ApiRes) => {
        setSnackbar("ユーザー情報を削除しました");
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
    deleteUser,
    error,
    isLoading,
  };
};
