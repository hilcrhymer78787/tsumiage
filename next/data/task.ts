import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "@/plugins/axios";
import { apiTaskDeleteRequestType } from "@/types/api/task/delete/request";
import { apiTaskReadRequestType } from "@/types/api/task/read/request";
import { apiTaskReadResponseType } from "@/types/api/task/read/response";
import { useState } from "react";

export const useTaskApi = (): {
  taskRead: (
    params: apiTaskReadRequestType
  ) => Promise<AxiosResponse<apiTaskReadResponseType>>;
  taskReadLoading: boolean;
  taskDelete: (params: apiTaskDeleteRequestType) => Promise<AxiosResponse>;
  taskDeleteLoading: boolean;
} => {
  
  // taskRead

  const [taskReadLoading, setTaskReadLoading] = useState<boolean>(false);
  const taskRead = async (
    params: apiTaskReadRequestType
  ): Promise<AxiosResponse<apiTaskReadResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/task/read",
      method: "GET",
      params: params,
    };
    setTaskReadLoading(true);
    return api(requestConfig)
      .finally(() => {
        setTaskReadLoading(false);
      });
  };

  // taskDelete

  const [taskDeleteLoading, setTaskDeleteLoading] = useState<boolean>(false);
  const taskDelete = async (
    params: apiTaskDeleteRequestType
  ): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/task/delete",
      method: "DELETE",
      data: params,
    };
    setTaskDeleteLoading(true);
    return api(requestConfig)
      .finally(() => {
        setTaskDeleteLoading(false);
      });
  };

  return {
    taskRead,
    taskReadLoading,
    taskDelete,
    taskDeleteLoading,
  };
};
