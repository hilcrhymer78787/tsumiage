import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";

export const useCreateUser = () => {
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
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setLoginInfo(res.data);
        return res;
      })
      .catch((err) => {
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
