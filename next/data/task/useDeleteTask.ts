import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useDeleteTask = () => {
  const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);
  const [deleteTaskError, setDeleteTaskError] = useState("");
  const deleteTask = async (id: number) => {
    setDeleteTaskError("");
    setDeleteTaskLoading(true);
    return api({
      url: "/api/task/delete",
      method: "DELETE",
      data: { id },
    })
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
