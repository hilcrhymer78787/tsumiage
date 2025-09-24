import { api } from "@/plugins/axios";
import { useState } from "react";
import { useErrHandler } from "@/data/common/useErrHandler";
type Request = {
  email: string;
};
export const useCreateInvitation = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
    
  const validation = (data: Request) => {
    let isError = false;
    setEmailError("");
    if (!/.+@.+\..+/.test(data.email)) {
      setEmailError("正しい形式で入力してください");
      isError = true;
    }
    return isError;
  };

  const createInvitation = async (data: Request) => {
    if (validation(data)) return;
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/create",
      method: "POST",
      data,
    })
      .then((res) => {
        setMessage(res.data.data.message);
        return res;
      })
      .catch((err) => {
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
