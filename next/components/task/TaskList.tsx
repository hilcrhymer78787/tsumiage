import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import CreateTask from "@/components/task/CreateTask";
import TaskItem from "@/components/task/TaskItem";
import { useReadTasks } from "@/data/task/useReadTasks";

type Props = {
  date: string;
  userId: number;
  readonly: boolean;
};
export default function TaskList({ date, userId, readonly }: Props) {
  const { tasks, readTasks, readTasksLoading, readTasksError } = useReadTasks();
  const [createTaskDialog, setCreateTaskDialog] = useState(false);
  const apiTaskRead = async () => {
    await readTasks(date, userId);
  };

  useEffect(() => {
    apiTaskRead();
  }, []);

  return (
    <>
      <Card>
        <CardHeader
          action={
            !readonly && (
              <IconButton
                onClick={() => setCreateTaskDialog(true)}
                component="span"
              >
                <AddIcon color="primary" />
              </IconButton>
            )
          }
          title="タスク"
          subheader={date}
        />
        {!!readTasksError && (
          <CardContent
            sx={{
              textAlign: "center",
              p: "20px !important",
            }}
          >
            {readTasksError}
          </CardContent>
        )}
        {readTasksLoading && !tasks?.length && (
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              p: "30px",
            }}
          >
            <CircularProgress />
          </CardContent>
        )}
        {!!tasks?.length && (
          <CardContent sx={{ p: "0 !important" }}>
            {tasks.map((task, index) => (
              <TaskItem
                task={task}
                date={date}
                apiTaskRead={apiTaskRead}
                key={index.toString()}
                readonly={readonly}
              />
            ))}
          </CardContent>
        )}
      </Card>

      <Dialog
        open={createTaskDialog}
        onClose={() => setCreateTaskDialog(false)}
      >
        {createTaskDialog && (
          <CreateTask
            onCloseMyself={() => {
              setCreateTaskDialog(false);
              apiTaskRead();
            }}
            task={null}
          />
        )}
      </Dialog>

      <pre>{JSON.stringify(tasks, null, 4)}</pre>
    </>
  );
}
