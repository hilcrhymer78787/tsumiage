import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useMemo, useState } from "react";
import { Task } from "@/data/types/task";

type Request = { date: string; user_id: number }
export const useReadTasks = () => {
  const { errHandler } = useErrHandler();
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

  const readTasks = async (params: Request) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/task/read",
      method: "GET",
      params,
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
