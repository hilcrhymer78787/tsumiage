import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useDeleteUser = () => {
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);
  const [deleteUserError, setDeleteUserError] = useState("");
  const deleteUser = async (id: number) => {
    setDeleteUserError("");
    setDeleteUserLoading(true);
    const requestConfig = {
      url: "/api/user/delete",
      method: "DELETE",
      data: { id },
    };
    return api(requestConfig as any)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setDeleteUserError);
      })
      .finally(() => {
        setDeleteUserLoading(false);
      });
  };

  return {
    deleteUser,
    deleteUserError,
    deleteUserLoading,
  };
};
