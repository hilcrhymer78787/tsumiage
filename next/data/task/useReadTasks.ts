import { WorkState } from "@/data/work/useCreateWork";
import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useMemo, useState } from "react";

export type Task = {
  id: number;
  name: string;
  createdAt: string;
  work: {
    id: number;
    state: WorkState;
  };
};

export const useReadTasks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const notDoneTasks = useMemo(() => {
    return tasks?.filter((task) => task.work.state === 0) ?? [];
  }, [tasks]);

  const doneTasks = useMemo(() => {
    return tasks?.filter((task) => task.work.state === 1) ?? [];
  }, [tasks]);

  const notNecessaryTasks = useMemo(() => {
    return tasks?.filter((task) => task.work.state === 2) ?? [];
  }, [tasks]);

  const isFirstLoading = !tasks?.length && isLoading;

  const readTasks = async (date: string, userId: number) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/task/read",
      method: "GET",
      params: { date, user_id: userId },
    })
      .then((res) => {
        setTasks(res.data.data.tasks);
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
    tasks,
    notDoneTasks,
    doneTasks,
    notNecessaryTasks,
    isFirstLoading,
    readTasks,
    error,
    isLoading,
  };
};
