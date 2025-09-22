import { useCallback, useEffect, useMemo, useState } from "react";

import ErrTxt from "@/components/common/ErrTxt";
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";
import TaskHeader from "@/components/task/TaskHeader";
import TaskList from "@/components/task/TaskList";
import dayjs from "dayjs";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useReadTasks } from "@/data/task/useReadTasks";

const TaskMain = () => {
  const date = dayjs().format("YYYY-MM-DD");
  const { loginInfo } = useLoginInfo();
  const {
    tasks,
    notDoneTasks,
    doneTasks,
    notNecessaryTasks,
    readTasks,
    readTasksLoading,
    readTasksError,
  } = useReadTasks();
  const [scrollY, setScrollY] = useState(0);

  const apiTaskRead = useCallback(() => {
    readTasks(date, loginInfo?.id ?? 0);
  }, [loginInfo?.id, readTasks, date]);

  const TaskContent = useMemo(() => {
    const cmnprops = {
      date,
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
          <TaskList title="未達成のタスク" tasks={notDoneTasks} {...cmnprops} />
        )}
        {!!doneTasks.length && (
          <TaskList title="達成したタスク" tasks={doneTasks} {...cmnprops} />
        )}
        {!!notNecessaryTasks.length && (
          <TaskList
            title="達成不要のタスク"
            tasks={notNecessaryTasks}
            {...cmnprops}
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
    date,
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
