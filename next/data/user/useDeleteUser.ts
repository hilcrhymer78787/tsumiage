import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useDeleteUser = () => {
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
      .catch((err) => {
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
