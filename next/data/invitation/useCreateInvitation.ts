import { api } from "@/plugins/axios";
import { useState } from "react";
import { useErrHandler } from "@/data/common/useErrHandler";
type Request = {
  email: string;
};
export const useCreateInvitation = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const createInvitation = async (data: Request) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/create",
      method: "POST",
      data,
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
