import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
import { LoginInfo } from "../types/loginInfo";
import { useSnackbar } from "../common/useSnackbar";
type ApiReq = {
  id: number;
  name: string;
  email: string;
  password: string;
  user_img: string;
  passwordAgain: string;
  file: any;
  passwordEditMode: boolean;
};
type ApiRes = CmnRes<LoginInfo>;
type ApiErr = CmnErr<{
  emailError?: string;
}>;

export const useCreateUser = () => {
  const { errHandler } = useErrHandler();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { loginInfo, setLoginInfo } = useLoginInfo();

  const validation = (data: ApiReq) => {
    let isError: boolean = false;
    setEmailError("");
    setPasswordError("");
    setNameError("");
    if (data.name == "") {
      setNameError("名前は必須です");
      isError = true;
    }
    if (!/.+@.+\..+/.test(data.email)) {
      setEmailError("正しい形式で入力してください");
      isError = true;
    }
    if (data.passwordEditMode) {
      if (data.password != data.passwordAgain) {
        setPasswordError("パスワードが一致しません");
        isError = true;
      }
      if (data.password.length < 8) {
        setPasswordError("パスワードは8桁以上で設定してください");
        isError = true;
      }
    }
    return isError;
  };

  const createUser = async (data: ApiReq) => {
    if (validation(data)) return;
    const postData: FormData = new FormData();
    if (data.file) postData.append("file", data.file);
    postData.append("id", data.id.toString());
    postData.append("name", data.name);
    postData.append("email", data.email);
    postData.append("password", data.password);
    postData.append("user_img", data.user_img);
    postData.append("img_oldname", loginInfo?.user_img ?? "");

    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/create",
      method: "POST",
      data: postData,
    })
      .then((res: ApiRes) => {
        localStorage.setItem("token", res.data.data.token);
        setLoginInfo(res.data.data);
        setSnackbar(`ユーザー情報を${!!data.id ? "更新" : "作成"}しました`);
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setError, true);
        const message = err.response?.data?.message ?? "";
        const emailErr = err.response?.data?.data?.emailError ?? "";
        setMessage(message);
        setEmailError(emailErr);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    message,
    emailError,
    nameError,
    passwordError,
    loginInfo,
    createUser,
    error,
    isLoading,
  };
};
