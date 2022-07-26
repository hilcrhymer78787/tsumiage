import { useState } from "react";
import { api } from "@/plugins/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiWorkReadCalendarRequestType } from "@/types/api/work/read/calendar/request";
import { apiWorkReadCalendarResponseType } from "@/types/api/work/read/calendar/response";
import { apiWorkCreateRequestType } from "@/types/api/work/create/request";
import { apiWorkDeleteRequestType } from "@/types/api/work/delete/request";
import axios from "axios"
const CancelToken = axios.CancelToken;
let getCalendarDataCancel: any = null;
export const useWorkApi = (): {
  workCreate: (params: apiWorkCreateRequestType) => Promise<AxiosResponse>;
  workCreateLoading: boolean;
  workReadCalendar: (
    params: apiWorkReadCalendarRequestType
  ) => Promise<AxiosResponse<apiWorkReadCalendarResponseType>>;
  workReadCalendarLoading: boolean;
  workDelete: (params: apiWorkDeleteRequestType) => Promise<AxiosResponse>;
  workDeleteLoading: boolean;
} => {
  
  // workCreate

  const [workCreateLoading, setWorkCreateLoading] = useState<boolean>(false);
  const workCreate = async (
    params: apiWorkCreateRequestType
  ): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/work/create",
      method: "POST",
      data: params,
    };
    setWorkCreateLoading(true);
    return api(requestConfig)
      .finally(() => {
        setWorkCreateLoading(false);
      });
  };

  // workReadCalendar

  const [workReadCalendarLoading, setWorkReadCalendarLoading] = useState<boolean>(false);
  const workReadCalendar = async (
    params: apiWorkReadCalendarRequestType
  ): Promise<AxiosResponse<apiWorkReadCalendarResponseType>> => {
    if (getCalendarDataCancel) {
      getCalendarDataCancel();
    }
    const requestConfig: AxiosRequestConfig = {
      url: "/api/work/read/calendar",
      method: "GET",
      params: params,
      cancelToken: new CancelToken(c => {
        getCalendarDataCancel = c;
      }),
    };
    setWorkReadCalendarLoading(true);
    return api(requestConfig)
      .finally(() => {
        setWorkReadCalendarLoading(false);
      });
  };

  // workDelete

  const [workDeleteLoading, setWorkDeleteLoading] = useState<boolean>(false);
  const workDelete = async (
    params: apiWorkDeleteRequestType
  ): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig<apiWorkDeleteRequestType> = {
      url: "/api/work/delete",
      method: "DELETE",
      data: params
    };
    setWorkDeleteLoading(true);
    return api(requestConfig)
      .finally(() => {
        setWorkDeleteLoading(false);
      });
  };

  return {
    workCreate,
    workCreateLoading,
    workReadCalendar,
    workReadCalendarLoading,
    workDelete,
    workDeleteLoading,
  };
};
