import React, { useCallback, useEffect, useState } from "react";
import { Task, useReadTasks } from "@/data/task/useReadTasks";

import ErrTxt from "@/components/common/ErrTxt";
import Layout from "@/layouts/default";
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";
import Sortable from "@/components/common/Sortable";
import TaskSortHeader from "@/components/task/TaskSortHeader";
import dayjs from "dayjs";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
import { useSortTasks } from "@/data/task/useSortTasks";

const TaskSort = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const { tasks, readTasks, readTasksLoading, readTasksError } = useReadTasks();
  const { sortTasks } = useSortTasks();
  const [scrollY, setScrollY] = useState(0);

  const apiTaskRead = async () => {
    await readTasks(dayjs().format("YYYY-MM-DD"), loginInfo?.id ?? 0);
  };

  const apiTaskSort = async (tasks: Task[]) => {
    sortTasks(tasks);
  };

  const TaskSortContent = useCallback(() => {
    if (!!readTasksError) return <ErrTxt txt={readTasksError} />;
    if (tasks === null) {
      if (readTasksLoading) return <Loading />;
      return <></>;
    }
    if (!tasks.length) return <NoData txt="登録されているタスクはありません" />;
    return <Sortable initItems={tasks} onChange={apiTaskSort} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readTasksLoading, readTasksError, tasks]);

  useEffect(() => {
    apiTaskRead();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout pcP="80px 0" spP="70px 10px 180px">
      <TaskSortHeader isGray={!!scrollY}/>
      <TaskSortContent />
      {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(tasks, null, 4)}</pre>
      )}
    </Layout>
  );
};
export default TaskSort;
