import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import axios, { Canceler } from "axios";
import { apiUserBearerAuthResponseType } from "@/types/api/user/bearerAuth/response";
import { atom, useRecoilState } from "recoil";

const CancelToken = axios.CancelToken;
let setLoginInfoByTokenCancel: Canceler;

const loginInfoAtom = atom<apiUserBearerAuthResponseType | null>({
  key: "loginInfo",
  dangerouslyAllowMutability: true,
  default: null,
});
export const useBearerAuth = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom);

  const [bearerAuthLoading, setBearerAuthLoading] =
    useState(false);
  const [bearerAuthError, setBearerAuthError] =
    useState("");

  const logout = () => {
    setLoginInfo(null);
    localStorage.removeItem("token");
  };

  const bearerAuth = async () => {
    setBearerAuthError("");
    setBearerAuthLoading(true);
    const requestConfig = {
      url: "/api/user/bearer_auth",
      method: "GET",
      cancelToken: new CancelToken((c) => {
        setLoginInfoByTokenCancel = c;
      }),
    };
    return api(requestConfig as any)
      .then((res) => {
        setLoginInfo(res.data);
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
