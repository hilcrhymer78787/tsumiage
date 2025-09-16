import { useState } from "react";
import { api } from "@/plugins/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiInvitationCreateRequestType } from "@/types/api/invitation/create/request";
import { apiInvitationDeleteRequestType } from "@/types/api/invitation/delete/request";
import { apiInvitationUpdateRequestType } from "@/types/api/invitation/update/request";

export const useInvitationApi = (): {
  invitationCreate: (
    params: apiInvitationCreateRequestType
  ) => Promise<AxiosResponse>;
  invitationCreateLoading: boolean;
  invitationUpdate: (
    params: apiInvitationUpdateRequestType
  ) => Promise<AxiosResponse>;
  invitationUpdateLoading: boolean;
  invitationDelete: (
    params: apiInvitationDeleteRequestType
  ) => Promise<AxiosResponse>;
  invitationDeleteLoading: boolean;
} => {
  // invitationCreate

  const [invitationCreateLoading, setInvitationCreateLoading] =
    useState<boolean>(false);
  const invitationCreate = async (
    params: apiInvitationCreateRequestType
  ): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/invitation/create",
      method: "POST",
      data: params,
    };
    setInvitationCreateLoading(true);
    return api(requestConfig).finally(() => {
      setInvitationCreateLoading(false);
    });
  };

  // invitationUpdate

  const [invitationUpdateLoading, setInvitationUpdateLoading] =
    useState<boolean>(false);
  const invitationUpdate = async (
    params: apiInvitationUpdateRequestType
  ): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/invitation/update",
      method: "PUT",
      data: params,
    };
    setInvitationUpdateLoading(true);
    return api(requestConfig).finally(() => {
      setInvitationUpdateLoading(false);
    });
  };

  // invitationDelete

  const [invitationDeleteLoading, setInvitationDeleteLoading] =
    useState<boolean>(false);
  const invitationDelete = async (
    params: apiInvitationDeleteRequestType
  ): Promise<AxiosResponse> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/api/invitation/delete",
      method: "DELETE",
      data: params,
    };
    setInvitationDeleteLoading(true);
    return api(requestConfig).finally(() => {
      setInvitationDeleteLoading(false);
    });
  };

  return {
    invitationCreate,
    invitationCreateLoading,
    invitationUpdate,
    invitationUpdateLoading,
    invitationDelete,
    invitationDeleteLoading,
  };
};
