import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useDeleteWork = () => {
  const [deleteWorkLoading, setDeleteWorkLoading] = useState(false);
  const [deleteWorkError, setDeleteWorkError] = useState("");
  const deleteWork = async (id: number) => {
    setDeleteWorkError("");
    setDeleteWorkLoading(true);
    const requestConfig = {
      url: "/api/work/delete",
      method: "DELETE",
      data: { id },
    };
    return api(requestConfig as any)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setDeleteWorkError);
      })
      .finally(() => {
        setDeleteWorkLoading(false);
      });
  };

  return {
    deleteWork,
    deleteWorkError,
    deleteWorkLoading,
  };
};
