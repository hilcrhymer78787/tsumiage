import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { Success } from "../types/success";
import { useSnackbar } from "../common/useSnackbar";
type Request = {
  invitation_id: number;
};
export const useUpdateInvitation = () => {
  const { setSnackbar } = useSnackbar();
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const updateInvitation = async (data: Request) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/update",
      method: "PUT",
      data,
    })
      .then((res: AxiosResponse<Success>) => {
        setSnackbar(res.data.data.message);
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
    updateInvitation,
    error,
    isLoading,
  };
};
