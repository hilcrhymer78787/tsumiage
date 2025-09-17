import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useDeleteUser = () => {
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);
  const [deleteUserError, setDeleteUserError] = useState("");
  const deleteUser = async (id: number) => {
    setDeleteUserError("");
    setDeleteUserLoading(true);
    return api({
      url: "/api/user/delete",
      method: "DELETE",
      data: { id },
    })
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
