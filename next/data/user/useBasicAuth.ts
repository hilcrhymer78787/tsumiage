import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";

export const useBasicAuth = () => {
  const { loginInfo, setLoginInfo } = useLoginInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const basicAuth = async (params: { email: string; password: string }) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/basic_auth",
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
    basicAuth,
    error,
    isLoading,
  };
};
