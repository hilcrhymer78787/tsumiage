import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useMemo, useState } from "react";
import { Task } from "@/data/types/task";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {
  date: string;
  user_id: number;
};
type ApiRes = CmnRes<{
  date: string;
  tasks: Task[];
}>;
type ApiErr = CmnErr;
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

  const readTasks = async (params: ApiReq) => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/task/read",
      method: "GET",
      params,
    })
      .then((res: ApiRes) => {
        setTasks(res.data.data.tasks);
        return res;
      })
      .catch((err: ApiErr) => {
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
