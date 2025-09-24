import { api } from "@/plugins/axios";
import { useState } from "react";
import { useErrHandler } from "@/data/common/useErrHandler";

export const useCreateInvitation = () => {
  const { errHandler } = useErrHandler();
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
