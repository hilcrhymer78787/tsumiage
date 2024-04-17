import { useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";
import Layout from "@/layouts/default";
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

  const apiTaskRead = async () => {
    await readTasks(dayjs().format("YYYY-MM-DD"), loginInfo?.id ?? 0);
  };

  const notDoneTasks = useMemo(() => {
    return tasks?.filter((task) => task.work.state === 0) ?? [];
  }, [tasks]);

  const doneTasks = useMemo(() => {
    return tasks?.filter((task) => task.work.state === 1) ?? [];
  }, [tasks]);

  const notNecessaryTasks = useMemo(() => {
    return tasks?.filter((task) => task.work.state === 2) ?? [];
  }, [tasks]);

  const cmnProps = {
    date: dayjs().format("YYYY-MM-DD"),
    readonly: false,
    apiTaskRead: apiTaskRead,
    readTasksLoading: readTasksLoading,
    readTasksError: readTasksError,
  };

  useEffect(() => {
    apiTaskRead();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout pcP="80px 0">
      <TaskHeader isGray={!!scrollY}/>
      <TaskList
        title="未達成のタスク"
        tasks={notDoneTasks}
        {...cmnProps}
        isShowAddBtn
      />
      {!!doneTasks.length && (
        <>
          <Box sx={{ p: 2 }}></Box>
          <TaskList title="達成したタスク" tasks={doneTasks} {...cmnProps} />
        </>
      )}
      {!!notNecessaryTasks.length && (
        <>
          <Box sx={{ p: 2 }}></Box>
          <TaskList
            title="達成不要のタスク"
            tasks={notNecessaryTasks}
            {...cmnProps}
          />
        </>
      )}
      {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(tasks, null, 4)}</pre>
      )}
    </Layout>
  );
};
export default Task;
