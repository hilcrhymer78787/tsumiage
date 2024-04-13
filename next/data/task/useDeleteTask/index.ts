import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useDeleteTask = () => {
  const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);
  const [deleteTaskError, setDeleteTaskError] = useState("");
  const deleteTask = async (id: number) => {
    setDeleteTaskError("");
    setDeleteTaskLoading(true);
    const requestConfig = {
      url: "/api/task/delete",
      method: "DELETE",
      data: { id },
    };
    return api(requestConfig as any)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setDeleteTaskError);
      })
      .finally(() => {
        setDeleteTaskLoading(false);
      });
  };

  return {
    deleteTask,
    deleteTaskError,
    deleteTaskLoading,
  };
};
