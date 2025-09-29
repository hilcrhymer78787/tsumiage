import { api } from "@/plugins/axios";
import { useState } from "react";
import { useErrHandler } from "@/data/common/useErrHandler";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {
  email: string;
};
type ApiRes = CmnRes<Success>;
type ApiErr = CmnErr;
export const useCreateInvitation = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const validation = (data: ApiReq) => {
    let isError = false;
    setEmailError("");
    if (!/.+@.+\..+/.test(data.email)) {
      setEmailError("正しい形式で入力してください");
      isError = true;
    }
    return isError;
  };

  const createInvitation = async (data: ApiReq) => {
    if (validation(data)) return;
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/create",
      method: "POST",
      data,
    })
      .then((res: ApiRes) => {
        setMessage(res.data.data.message);
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setError, true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    createInvitation,
    error,
    emailError,
    setEmailError,
    message,
    setMessage,
    isLoading,
  };
};
