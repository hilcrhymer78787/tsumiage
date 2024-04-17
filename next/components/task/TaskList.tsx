import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CreateTask from "@/components/task/CreateTask";
import ErrTxt from "@/components/common/ErrTxt";
import Loading from "@/components/common/Loading";
import { Task } from "@/data/task/useReadTasks";
import TaskItem from "@/components/task/TaskItem";
import { useState } from "react";

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
        <CardContent sx={{ p: "0 !important" }}>
          <ErrTxt txt={readTasksError} />
          {readTasksLoading && !tasks?.length && <Loading />}
          {tasks?.map((task, index) => (
            <TaskItem
              task={task}
              date={date}
              apiTaskRead={apiTaskRead}
              key={index.toString()}
              readonly={readonly}
            />
          ))}
        </CardContent>
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
