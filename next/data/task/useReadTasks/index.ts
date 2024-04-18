import { WorkState } from "@/data/work/useCreateWork";
import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export type Task = {
  id: number;
  name: string;
  createdAt: string;
  sort_key: number | null | undefined;
  work: {
    id: number;
    state: WorkState;
  };
};

export const useReadTasks = () => {
  const [readTasksLoading, setReadTasksLoading] = useState(false);
  const [readTasksError, setReadTasksError] = useState("");
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const readTasks = async (date: string, userId: number) => {
    setReadTasksError("");
    setReadTasksLoading(true);
    const requestConfig = {
      url: "/api/task/read",
      method: "GET",
      params: { date, userId },
    };
    return api(requestConfig as any)
      .then((res) => {
        setTasks(res.data.tasks);
        return res;
      })
      .catch((err) => {
        errHandler(err, setReadTasksError);
      })
      .finally(() => {
        setReadTasksLoading(false);
      });
  };

  return {
    tasks,
    readTasks,
    readTasksError,
    readTasksLoading,
  };
};
