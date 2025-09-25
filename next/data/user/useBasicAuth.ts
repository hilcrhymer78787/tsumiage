import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";

type Request = {
  email: string;
  password: string;
};
export const useBasicAuth = () => {
  const { errHandler } = useErrHandler();
  const { loginInfo, setLoginInfo } = useLoginInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
      .catch((err) => {
        errHandler(err, setError);
        const message = err.response?.data?.data?.message;
        // TODO
        if (message === "このメールアドレスは登録されていません") {
          setEmailError(message);
        }
        if (message === "パスワードが間違っています") {
          setPasswordError(message);
        }
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
