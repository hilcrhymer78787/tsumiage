import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useDeleteWork = () => {
  const [deleteWorkLoading, setDeleteWorkLoading] = useState(false);
  const [deleteWorkError, setDeleteWorkError] = useState("");
  const deleteWork = async (id: number) => {
    setDeleteWorkError("");
    setDeleteWorkLoading(true);
    return api({
      url: "/api/work/delete",
      method: "DELETE",
      data: { id },
    })
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
