import { Task } from "@/data/task/useReadTasks";
import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export const useSortTasks = () => {
  const [sortTasksLoading, setSortTasksLoading] = useState(false);
  const [sortTasksError, setSortTasksError] = useState("");
  const [nameError, setNameError] = useState("");
  const sortTasks = async (tasks: Task[]) => {
    setSortTasksError("");
    setNameError("");
    setSortTasksLoading(true);
    return api({
      url: "/api/task/sort",
      method: "POST",
      data: { tasks },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setSortTasksError);
      })
      .finally(() => {
        setSortTasksLoading(false);
      });
  };

  return {
    sortTasks,
    sortTasksError,
    sortTasksLoading,
    nameError,
  };
};
