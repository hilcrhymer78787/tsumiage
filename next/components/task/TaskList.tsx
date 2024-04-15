import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  IconButton,
  Typography,
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
  isShowAddBtn?: boolean;
};
const TaskList = ({
  date,
  readonly,
  tasks,
  apiTaskRead,
  readTasksLoading,
  readTasksError,
  title,
  isShowAddBtn,
}: Props) => {
  const [createTaskDialog, setCreateTaskDialog] = useState(false);

  return (
    <>
      <Card>
        <CardHeader
          action={
            !readonly &&
            !!isShowAddBtn && (
              <Button onClick={() => setCreateTaskDialog(true)}>
                <AddIcon sx={{ marginTop: "-4px" }} color="primary" />
                <Typography>新規</Typography>
              </Button>
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
