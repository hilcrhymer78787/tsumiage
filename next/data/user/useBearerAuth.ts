import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import axios, { Canceler } from "axios";
import { useLoginInfo } from "@/data/common/useLoginInfo";

const CancelToken = axios.CancelToken;
let setLoginInfoByTokenCancel: Canceler;

export const useBearerAuth = () => {
  const { loginInfo, setLoginInfo } = useLoginInfo();
  const [bearerAuthLoading, setBearerAuthLoading] = useState(false);
  const [bearerAuthError, setBearerAuthError] = useState("");

  const logout = () => {
    setLoginInfo(null);
    localStorage.removeItem("token");
  };

  const bearerAuth = async () => {
    setBearerAuthError("");
    setBearerAuthLoading(true);
    return api({
      url: "/api/user/auth/bearer",
      method: "GET",
      cancelToken: new CancelToken((c) => {
        setLoginInfoByTokenCancel = c;
      }),
    })
      .then((res) => {
        setLoginInfo(res.data.data);
        return res;
      })
      .catch((err) => {
        errHandler(err, setBearerAuthError);
      })
      .finally(() => {
        setBearerAuthLoading(false);
      });
  };

  return {
    loginInfo,
    logout,
    bearerAuth,
    bearerAuthError,
    bearerAuthLoading,
  };
};
