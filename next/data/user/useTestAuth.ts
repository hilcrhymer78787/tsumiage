import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
import { LoginInfo } from "../types/loginInfo";
import { useSnackbar } from "../common/useSnackbar";
type ApiReq = {};
type ApiRes = CmnRes<LoginInfo>;
type ApiErr = CmnErr;

export const useTestAuth = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const { loginInfo, setLoginInfo } = useLoginInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const testAuth = async () => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/auth/test",
      method: "GET",
    })
      .then((res: ApiRes) => {
        const user = res.data.data;
        localStorage.setItem("token", user.token);
        setLoginInfo(user);
        setSnackbar("テストユーザーでログインしました");
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
    loginInfo,
    testAuth,
    error,
    isLoading,
  };
};
