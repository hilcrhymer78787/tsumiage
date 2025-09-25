import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import axios, { Canceler } from "axios";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { ApiErr } from "@/data/types/apiErr";

const CancelToken = axios.CancelToken;
let setLoginInfoByTokenCancel: Canceler;

export const useBearerAuth = () => {
  const { errHandler } = useErrHandler();
  const { loginInfo, setLoginInfo } = useLoginInfo();
  const [bearerAuthLoading, setBearerAuthLoading] = useState(false);
  const [bearerAuthError, setBearerAuthError] = useState("");

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
      .catch((err: ApiErr) => {
        errHandler(err, setBearerAuthError, true);
      })
      .finally(() => {
        setBearerAuthLoading(false);
      });
  };

  return {
    loginInfo,
    bearerAuth,
    bearerAuthError,
    bearerAuthLoading,
  };
};
