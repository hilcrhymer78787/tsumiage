import { useCallback, useEffect, useMemo, useState } from "react";

import ErrTxt from "@/components/common/ErrTxt";
import Layout from "@/layouts/default";
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";
import TaskHeader from "@/components/task/TaskHeader";
import TaskList from "@/components/task/TaskList";
import dayjs from "dayjs";
import { loginInfoAtom } from "@/data/user";
import { useReadTasks } from "@/data/task/useReadTasks";
import { useRecoilValue } from "recoil";

const Task = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const { tasks, readTasks, readTasksLoading, readTasksError } = useReadTasks();
  const [scrollY, setScrollY] = useState(0);

  const apiTaskRead = useCallback(async () => {
    await readTasks(dayjs().format("YYYY-MM-DD"), loginInfo?.id ?? 0);
  }, [loginInfo?.id, readTasks]);

  const notDoneTasks = useMemo(() => {
    return tasks?.filter((task) => task.work.state === 0) ?? [];
  }, [tasks]);

  const doneTasks = useMemo(() => {
    return tasks?.filter((task) => task.work.state === 1) ?? [];
  }, [tasks]);

  const notNecessaryTasks = useMemo(() => {
    return tasks?.filter((task) => task.work.state === 2) ?? [];
  }, [tasks]);

  const TaskContent = useMemo(() => {
    const cmnProps = {
      date: dayjs().format("YYYY-MM-DD"),
      readonly: false,
      apiTaskRead: apiTaskRead,
      readTasksLoading: readTasksLoading,
      readTasksError: readTasksError,
      sx: { mb: 5 },
    };
    if (!!readTasksError) return <ErrTxt txt={readTasksError} />;
    if (tasks === null) {
      if (readTasksLoading) return <Loading />;
      return <></>;
    }
    if (!tasks.length) return <NoData txt="登録されているタスクはありません" />;
    return (
      <>
        {!!notDoneTasks.length && (
          <TaskList title="未達成のタスク" tasks={notDoneTasks} {...cmnProps} />
        )}
        {!!doneTasks.length && (
          <TaskList title="達成したタスク" tasks={doneTasks} {...cmnProps} />
        )}
        {!!notNecessaryTasks.length && (
          <TaskList
            title="達成不要のタスク"
            tasks={notNecessaryTasks}
            {...cmnProps}
          />
        )}
      </>
    );
  }, [
    apiTaskRead,
    doneTasks,
    notDoneTasks,
    notNecessaryTasks,
    readTasksError,
    readTasksLoading,
    tasks,
  ]);

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
      <TaskHeader isGray={!!scrollY} apiTaskRead={apiTaskRead} />
      {TaskContent}
      {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(tasks, null, 4)}</pre>
      )}
    </Layout>
  );
};
export default Task;
