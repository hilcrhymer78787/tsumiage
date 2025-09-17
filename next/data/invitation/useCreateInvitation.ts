import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useCreateInvitation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const createInvitation = async (params: { email: string }) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/create",
      method: "POST",
      data: params,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    createInvitation,
    error,
    isLoading,
  };
};
