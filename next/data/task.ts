import { useState } from "react";
import { api } from "@/plugins/axios";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { apiTaskReadRequestType } from "@/types/api/task/read/request";
import { apiTaskReadResponseType } from "@/types/api/task/read/response";
export const useTaskApi = (): {
  taskRead: (
    params: apiTaskReadRequestType
  ) => Promise<AxiosResponse<apiTaskReadResponseType>>;
  taskReadLoading: boolean;
} => {
  const [taskReadLoading, seTtaskReadLoading] = useState<boolean>(false);
  const taskRead = async (
    params: apiTaskReadRequestType
  ): Promise<AxiosResponse<apiTaskReadResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/task/read",
      method: "GET",
      params: params,
    };
    seTtaskReadLoading(true);
    return api(requestConfig)
      .then((res: AxiosResponse<apiTaskReadResponseType>) => {
        return res;
      })
      .catch((err: AxiosError) => {
        throw err.response;
      })
      .finally(() => {
        seTtaskReadLoading(false);
      });
  };

  return {
    taskRead,
    taskReadLoading,
  };
};
