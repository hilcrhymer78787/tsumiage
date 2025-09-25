import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { ApiErr } from "@/data/types/apiErr";
type Request = {
  email: string;
  password: string;
};
export const useBasicAuth = () => {
  const { errHandler } = useErrHandler();
  const { loginInfo, setLoginInfo } = useLoginInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validation = (data: Request) => {
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

  const basicAuth = async (data: Request) => {
    if (validation(data)) return;
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/auth/basic",
      method: "POST",
      data,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setLoginInfo(res.data.data);
        return res;
      })
      .catch((err: ApiErr<{ emailError?: string; passwordError?: string }>) => {
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
