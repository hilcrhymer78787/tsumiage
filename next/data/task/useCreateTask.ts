import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useCreateTask = () => {
  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  const [createTaskError, setCreateTaskError] = useState("");
  const [nameError, setNameError] = useState("");
  const createTask = async (id: number, name: string) => {
    setCreateTaskError("");
    setNameError("");
    let isError = false;
    if (!name) {
      setNameError("名前は必須です");
      isError = true;
    }
    if (isError) return;
    setCreateTaskLoading(true);
    return api({
      url: "/api/task/create",
      method: "POST",
      data: { id, name },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setCreateTaskError);
      })
      .finally(() => {
        setCreateTaskLoading(false);
      });
  };

  return {
    createTask,
    createTaskError,
    createTaskLoading,
    nameError,
  };
};
