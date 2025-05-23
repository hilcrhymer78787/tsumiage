import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler } from "axios";

import { api } from "@/plugins/axios";
import { apiUserBasicAuthRequestType } from "@/types/api/user/basicAuth/request";
import { apiUserBasicAuthResponseType } from "@/types/api/user/basicAuth/response";
import { apiUserBearerAuthResponseType } from "@/types/api/user/bearerAuth/response";
import { apiUserCreateResponseType } from "@/types/api/user/create/response";
import { atom } from "recoil";
import { errorType } from "@/types/api/error";
import { useState } from "react";

export const loginInfoAtom = atom<apiUserBearerAuthResponseType | null>({
  key: "loginInfo",
  dangerouslyAllowMutability: true,
  default: null,
});
export const useUserApi = () => {

  // testAuthentication

  const [testAuthenticationLoading, setTestAuthenticationLoading] = useState<boolean>(false);
  const testAuthentication = async (): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/user/test_auth",
      method: "GET",
    };
    setTestAuthenticationLoading(true);
    return api(requestConfig)
      .finally(() => {
        setTestAuthenticationLoading(false);
      });
  };

  // basicAuth

  const [basicAuthLoading, setBasicAuthLoading] = useState<boolean>(false);
  const basicAuth = async (
    params: apiUserBasicAuthRequestType
  ): Promise<AxiosResponse<apiUserBasicAuthResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/user/basic_auth",
      method: "POST",
      data: params
    };
    setBasicAuthLoading(true);
    return api(requestConfig)
      .catch((err: AxiosError<errorType>) => {
        throw err;
      })
      .finally(() => {
        setBasicAuthLoading(false);
      });
  };

  // createUser

  const [createUserLoading, setCreateUserLoading] = useState<boolean>(false);
  const createUser = async (
    params: FormData
  ): Promise<AxiosResponse<apiUserCreateResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/user/create",
      method: "POST",
      data: params
    };
    setCreateUserLoading(true);
    return api(requestConfig)
      .catch((err: AxiosError<errorType>) => {
        throw err;
      })
      .finally(() => {
        setCreateUserLoading(false);
      });
  };

  return {
    testAuthentication,
    testAuthenticationLoading,
    basicAuth,
    basicAuthLoading,
    createUser,
    createUserLoading,
  };
};
