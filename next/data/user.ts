import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler } from "axios";

import { api } from "@/plugins/axios";
import { apiUserBasicAuthenticationRequestType } from "@/types/api/user/basicAuthentication/request";
import { apiUserBasicAuthenticationResponseType } from "@/types/api/user/basicAuthentication/response";
import { apiUserBearerAuthenticationResponseType } from "@/types/api/user/bearerAuthentication/response";
import { apiUserCreateResponseType } from "@/types/api/user/create/response";
import { atom } from "recoil";
import { errorType } from "@/types/api/error";
import { useState } from "react";
const CancelToken = axios.CancelToken;
let setLoginInfoByTokenCancel: Canceler;
export const loginInfoAtom = atom<apiUserBearerAuthenticationResponseType | null>({
  key: "loginInfo",
  dangerouslyAllowMutability: true,
  default: null,
});
export const useUserApi = (): {
  testAuthentication: () => Promise<AxiosResponse>;
  testAuthenticationLoading: boolean;
  basicAuthentication: (
    params: apiUserBasicAuthenticationRequestType
  ) => Promise<AxiosResponse<apiUserBasicAuthenticationResponseType>>;
  basicAuthenticationLoading: boolean;
  bearerAuthentication: () => Promise<AxiosResponse<apiUserBearerAuthenticationResponseType>>;
  bearerAuthenticationLoading: boolean;
  createUser: (params: FormData) => Promise<AxiosResponse<apiUserCreateResponseType>>;
  createUserLoading: boolean;
} => {

  // testAuthentication

  const [testAuthenticationLoading, setTestAuthenticationLoading] = useState<boolean>(false);
  const testAuthentication = async (): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/user/test_authentication",
      method: "GET",
    };
    setTestAuthenticationLoading(true);
    return api(requestConfig)
      .finally(() => {
        setTestAuthenticationLoading(false);
      });
  };

  // basicAuthentication

  const [basicAuthenticationLoading, setBasicAuthenticationLoading] = useState<boolean>(false);
  const basicAuthentication = async (
    params: apiUserBasicAuthenticationRequestType
  ): Promise<AxiosResponse<apiUserBasicAuthenticationResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/user/basic_authentication",
      method: "POST",
      data: params
    };
    setBasicAuthenticationLoading(true);
    return api(requestConfig)
      .catch((err: AxiosError<errorType>) => {
        throw err;
      })
      .finally(() => {
        setBasicAuthenticationLoading(false);
      });
  };

  // bearerAuthentication

  const [bearerAuthenticationLoading, setBearerAuthenticationLoading] = useState<boolean>(false);
  const bearerAuthentication = async (): Promise<AxiosResponse<apiUserBearerAuthenticationResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/user/bearer_authentication",
      method: "GET",
      cancelToken: new CancelToken(c => {
        setLoginInfoByTokenCancel = c;
      }),
    };
    setBearerAuthenticationLoading(true);
    return api(requestConfig)
      .finally(() => {
        setBearerAuthenticationLoading(false);
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
    basicAuthentication,
    basicAuthenticationLoading,
    bearerAuthentication,
    bearerAuthenticationLoading,
    createUser,
    createUserLoading,
  };
};
