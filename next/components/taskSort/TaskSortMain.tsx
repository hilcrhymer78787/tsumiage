import { useEffect, useState } from "react";
import { useReadTasks } from "@/data/task/useReadTasks";

import Sortable from "@/components/common/Sortable";
import TaskSortHeader from "@/components/task/TaskSortHeader";
import dayjs from "dayjs";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useSortTasks } from "@/data/task/useSortTasks";
import { Task } from "@/data/types/task";
import ApiHandle from "../common/ApiHandle";

const TaskSortMain = () => {
  const { loginInfo } = useLoginInfo();
  const { isFirstLoading, tasks, readTasks, error } = useReadTasks();
  const { sortTasks } = useSortTasks();
  const [scrollY, setScrollY] = useState(0);

  const apiTaskRead = async () => {
    await readTasks({
      date: dayjs().format("YYYY-MM-DD"),
      user_id: loginInfo?.id ?? 0,
    });
  };

  const apiTaskSort = async (tasks: Task[]) => {
    const ids = tasks.map(({ id }) => id);
    sortTasks({ ids });
  };

  useEffect(() => {
    apiTaskRead();
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApiHandle
      isLoading={isFirstLoading}
      isError={!!error}
      isNoData={tasks?.length === 0}
      errorTxt={error}
      noDataTxt="登録されているタスクはありません"
      p={5}
    >
      <TaskSortHeader isGray={!!scrollY} />
      {!!tasks?.length && <Sortable initItems={tasks} onChange={apiTaskSort} />}
      {process.env.NODE_ENV === "development" && <pre>{JSON.stringify(tasks, null, 4)}</pre>}
    </ApiHandle>
  );
};
export default TaskSortMain;
