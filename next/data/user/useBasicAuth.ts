import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
import { LoginInfo } from "../types/loginInfo";
import { useSnackbar } from "../common/useSnackbar";
type ApiReq = {
  email: string;
  password: string;
};
type ApiRes = CmnRes<LoginInfo>;
type ApiErr = CmnErr<{
  emailError?: string;
  passwordError?: string;
}>;
export const useBasicAuth = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const { loginInfo, setLoginInfo } = useLoginInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validation = (data: ApiReq) => {
    let isError = false;
    setEmailError("");
    setPasswordError("");
    if (!/.+@.+\..+/.test(data.email)) {
      setEmailError("正しい形式で入力してください");
      isError = true;
    }
    if (data.password.length < 8) {
      setPasswordError("パスワードは8桁以上で設定してください");
      isError = true;
    }
    return isError;
  };

  const basicAuth = async (data: ApiReq) => {
    if (validation(data)) return;
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/auth/basic",
      method: "POST",
      data,
    })
      .then((res: ApiRes) => {
        const user = res.data.data;
        localStorage.setItem("token", user.token);
        setLoginInfo(user);
        setSnackbar(`${user.name}さんこんにちは`);
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setError, true);
        const message = err.response?.data?.message ?? "";
        const emailErr = err.response?.data?.data?.emailError ?? "";
        const passwordErr = err.response?.data?.data?.passwordError ?? "";
        setMessage(message);
        setEmailError(emailErr);
        setPasswordError(passwordErr);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    message,
    emailError,
    passwordError,
    loginInfo,
    basicAuth,
    error,
    isLoading,
  };
};
