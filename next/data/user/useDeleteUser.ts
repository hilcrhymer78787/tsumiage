import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { ApiErr } from "@/data/types/apiErr";

export const useDeleteUser = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const deleteUser = async () => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/user/delete",
      method: "DELETE",
    })
      .then((res) => {
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    deleteUser,
    error,
    isLoading,
  };
};
