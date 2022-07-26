import { useState } from "react";
import { api } from "@/plugins/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiGoalReadRequestType } from "@/types/api/goal/read/request";
import { apiGoalReadResponseType } from "@/types/api/goal/read/response";
import { apiGoalCreateRequestType } from "@/types/api/goal/create/request";
import { apiGoalDeleteRequestType } from "@/types/api/goal/delete/request";
export const useGoalApi = (): {
  goalCreate: (params: apiGoalCreateRequestType) => Promise<AxiosResponse>;
  goalCreateLoading: boolean;
  goalRead: (
    params: apiGoalReadRequestType
  ) => Promise<AxiosResponse<apiGoalReadResponseType>>;
  goalReadLoading: boolean;
  goalDelete: (params: apiGoalDeleteRequestType) => Promise<AxiosResponse>;
  goalDeleteLoading: boolean;
} => {
  
  // goalCreate

  const [goalCreateLoading, setGoalCreateLoading] = useState<boolean>(false);
  const goalCreate = async (
    params: apiGoalCreateRequestType
  ): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/goal/create",
      method: "POST",
      data: params,
    };
    setGoalCreateLoading(true);
    return api(requestConfig)
      .finally(() => {
        setGoalCreateLoading(false);
      });
  };

  // goalRead

  const [goalReadLoading, setGoalReadLoading] = useState<boolean>(false);
  const goalRead = async (
    params: apiGoalReadRequestType
  ): Promise<AxiosResponse<apiGoalReadResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/goal/read",
      method: "GET",
      params: params,
    };
    setGoalReadLoading(true);
    return api(requestConfig)
      .finally(() => {
        setGoalReadLoading(false);
      });
  };

  // goalDelete

  const [goalDeleteLoading, setGoalDeleteLoading] = useState<boolean>(false);
  const goalDelete = async (
    params: apiGoalDeleteRequestType
  ): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/goal/delete",
      method: "DELETE",
      data: params,
    };
    setGoalDeleteLoading(true);
    return api(requestConfig)
      .finally(() => {
        setGoalDeleteLoading(false);
      });
  };

  return {
    goalCreate,
    goalCreateLoading,
    goalRead,
    goalReadLoading,
    goalDelete,
    goalDeleteLoading,
  };
};
