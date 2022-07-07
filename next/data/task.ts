import { useState } from "react";
import { api } from "@/plugins/axios";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { apiTaskReadRequestType } from "@/types/api/task/read/request";
import { apiTaskReadResponseType } from "@/types/api/task/read/response";
import { apiTaskCreateRequestType } from "@/types/api/task/create/request";
import { apiTaskDeleteRequestType } from "@/types/api/task/delete/request";
export const useTaskApi = (): {
  taskCreate: (params: apiTaskCreateRequestType) => Promise<AxiosResponse>;
  taskCreateLoading: boolean;
  taskRead: (
    params: apiTaskReadRequestType
  ) => Promise<AxiosResponse<apiTaskReadResponseType>>;
  taskReadLoading: boolean;
  taskDelete: (params: apiTaskDeleteRequestType) => Promise<AxiosResponse>;
  taskDeleteLoading: boolean;
} => {
  
  // taskCreate

  const [taskCreateLoading, setTaskCreateLoading] = useState<boolean>(false);
  const taskCreate = async (
    params: apiTaskCreateRequestType
  ): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/task/create",
      method: "POST",
      data: params,
    };
    setTaskCreateLoading(true);
    return api(requestConfig)
      .then((res: AxiosResponse) => {
        return res;
      })
      .catch((err: AxiosError) => {
        throw err.response;
      })
      .finally(() => {
        setTaskCreateLoading(false);
      });
  };

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
      .then((res: AxiosResponse<apiTaskReadResponseType>) => {
        return res;
      })
      .catch((err: AxiosError) => {
        throw err.response;
      })
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
      .then((res: AxiosResponse) => {
        return res;
      })
      .catch((err: AxiosError) => {
        throw err.response;
      })
      .finally(() => {
        setTaskDeleteLoading(false);
      });
  };

  return {
    taskCreate,
    taskCreateLoading,
    taskRead,
    taskReadLoading,
    taskDelete,
    taskDeleteLoading,
  };
};
