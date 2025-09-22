import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useSnackbar } from "@/data/common/useSnackbar";

export const useTestAuth = () => {
  const { loginInfo, setLoginInfo } = useLoginInfo();
  const { setSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const testAuth = async () => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/auth/test",
      method: "GET",
    })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setLoginInfo(res.data.data);
        return res;
      })
      .catch((err) => {
        const error = errHandler(err, setError);
        setSnackbar(error, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    loginInfo,
    testAuth,
    error,
    isLoading,
  };
};
