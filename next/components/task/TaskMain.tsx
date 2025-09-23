import { useCallback, useEffect, useMemo, useState } from "react";
import TaskHeader from "@/components/task/TaskHeader";
import TaskList from "@/components/task/TaskList";
import dayjs from "dayjs";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useReadTasks } from "@/data/task/useReadTasks";
import ApiHandle from "../common/ApiHandle";

const TaskMain = () => {
  const date = dayjs().format("YYYY-MM-DD");
  const { loginInfo } = useLoginInfo();
  const {
    tasks,
    notDoneTasks,
    doneTasks,
    notNecessaryTasks,
    readTasks,
    isFirstLoading,
    isLoading,
    error,
  } = useReadTasks();
  const [scrollY, setScrollY] = useState(0);
  const apiTaskRead = useCallback(() => {
    readTasks({ date, user_id: loginInfo?.id ?? 0 });
  }, [loginInfo?.id, readTasks, date]);

  const TaskContent = useMemo(() => {
    const cmnprops = {
      date,
      readonly: false,
      apiTaskRead: apiTaskRead,
      isLoading,
      error,
      sx: { mb: 5 },
    };
    return (
      <ApiHandle
        isLoading={isFirstLoading}
        isError={!!error}
        isNoData={tasks?.length === 0}
        errorTxt={error}
        noDataTxt="登録されているタスクはありません"
        p={5}
      >
        <TaskList title="未達成のタスク" tasks={notDoneTasks} {...cmnprops} />
        <TaskList title="達成したタスク" tasks={doneTasks} {...cmnprops} />
        <TaskList
          title="達成不要のタスク"
          tasks={notNecessaryTasks}
          {...cmnprops}
        />
      </ApiHandle>
    );
  }, [
    date,
    doneTasks,
    error,
    isFirstLoading,
    isLoading,
    notDoneTasks,
    notNecessaryTasks,
    tasks?.length,
    apiTaskRead,
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
    <>
      <TaskHeader isGray={!!scrollY} apiTaskRead={apiTaskRead} />
      {TaskContent}
      {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(tasks, null, 4)}</pre>
      )}
    </>
  );
};

export default TaskMain;
