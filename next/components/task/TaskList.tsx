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
import { Task } from "@/data/task/useReadTasks";
import TaskItem from "@/components/task/TaskItem";

type Props = {
  date: string;
  readonly: boolean;
  tasks: Task[] | null;
  apiTaskRead: () => void;
  readTasksLoading: boolean;
  readTasksError: string;
  title: string;
};
const TaskList = ({
  date,
  readonly,
  tasks,
  apiTaskRead,
  readTasksLoading,
  readTasksError,
  title,
}: Props) => {
  const [createTaskDialog, setCreateTaskDialog] = useState(false);

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
          title={title}
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
    </>
  );
};
export default TaskList;
