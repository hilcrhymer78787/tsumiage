import { Box } from "@mui/material";
import Layout from "@/layouts/default";
import TaskList from "@/components/task/TaskList";
import dayjs from "dayjs";
import { loginInfoAtom } from "@/data/user";
import { useMemo } from "react";
import { useReadTasks } from "@/data/task/useReadTasks";
import { useRecoilValue } from "recoil";
const Task = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const { tasks, readTasks, readTasksLoading, readTasksError } = useReadTasks();
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

  return (
    <Layout>
      <TaskList
        title="未達成のタスク"
        date={dayjs().format("YYYY-MM-DD")}
        readonly={false}
        tasks={notDoneTasks}
        apiTaskRead={apiTaskRead}
        readTasksLoading={readTasksLoading}
        readTasksError={readTasksError}
      />
      <Box sx={{ p: 2 }}></Box>
      <TaskList
        title="達成したタスク"
        date={dayjs().format("YYYY-MM-DD")}
        readonly={false}
        tasks={doneTasks}
        apiTaskRead={apiTaskRead}
        readTasksLoading={readTasksLoading}
        readTasksError={readTasksError}
      />
      <Box sx={{ p: 2 }}></Box>
      <TaskList
        title="達成不要のタスク"
        date={dayjs().format("YYYY-MM-DD")}
        readonly={false}
        tasks={notNecessaryTasks}
        apiTaskRead={apiTaskRead}
        readTasksLoading={readTasksLoading}
        readTasksError={readTasksError}
      />
    </Layout>
  );
};
export default Task;
