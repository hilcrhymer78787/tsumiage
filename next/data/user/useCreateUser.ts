import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
import { LoginInfo } from "../types/loginInfo";
type ApiReq = {};
type ApiRes = CmnRes<LoginInfo>
type ApiErr = CmnErr

export const useCreateUser = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginInfo, setLoginInfo } = useLoginInfo();

  const createUser = async (params: FormData) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/create",
      method: "POST",
      data: params,
    })
      .then((res: ApiRes) => {
        localStorage.setItem("token", res.data.data.token);
        setLoginInfo(res.data.data);
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
    createUser,
    error,
    isLoading,
  };
};
