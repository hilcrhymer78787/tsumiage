import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { Success } from "../types/success";

type Request = {
  id: number;
};
export const useDeleteWork = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const deleteWork = async (data: Request) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/work/delete",
      method: "DELETE",
      data,
    })
      .then((res: AxiosResponse<Success>) => {
        // setSnackbar(res.data.data.message);
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
    deleteWork,
    error,
    isLoading,
  };
};
