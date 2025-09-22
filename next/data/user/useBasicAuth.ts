import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useSnackbar } from "@/data/common/useSnackbar";

export const useBasicAuth = () => {
  const { setSnackbar } = useSnackbar();
  const { loginInfo, setLoginInfo } = useLoginInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validation = (params: { email: string; password: string }) => {
    let isError = false;
    setEmailError("");
    setPasswordError("");
    if (!/.+@.+\..+/.test(params.email)) {
      setEmailError("正しい形式で入力してください");
      isError = true;
    }
    if (params.password.length < 8) {
      setPasswordError("パスワードは8桁以上で設定してください");
      isError = true;
    }
    return isError;
  };

  const basicAuth = async (params: { email: string; password: string }) => {
    if (validation(params)) return;
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/auth/basic",
      method: "POST",
      data: params,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setLoginInfo(res.data.data);
        return res;
      })
      .catch((err) => {
        const error = errHandler(err, setError);
        if (error === "このメールアドレスは登録されていません") {
          setEmailError("このメールアドレスは登録されていません");
          return;
        }
        if (error === "パスワードが間違っています") {
          setPasswordError("パスワードが間違っています");
          return;
        }
        setSnackbar(error, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    emailError,
    passwordError,
    loginInfo,
    basicAuth,
    error,
    isLoading,
  };
};
