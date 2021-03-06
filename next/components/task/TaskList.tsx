import React from "react";
import CreateTask from "@/components/task/CreateTask";
import TaskItem from "@/components/task/TaskItem";
import { apiTaskReadResponseTaskType } from "@/types/api/task/read/response";
import AddIcon from "@mui/icons-material/Add";
import { useTaskApi } from "@/data/task";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Dialog,
  CircularProgress
} from "@mui/material";
type Props = {
  date: string,
  userId: number,
  readonly: boolean,
}
export default function TaskList(props: Props) {
  const { taskRead, taskReadLoading } = useTaskApi();
  const [createTaskDialog, setCreateTaskDialog] = React.useState<boolean>(false);
  const [tasks, setTasks] = React.useState<apiTaskReadResponseTaskType[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const apiTaskRead = async () => {
    try {
      const res = await taskRead({
        date: props.date,
        user_id: props.userId,
      });
      setTasks(res.data.tasks);
      setErrorMessage(null);
      if (!res.data.tasks.length) setErrorMessage("登録されているタスクはありません");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setErrorMessage(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        setErrorMessage("予期せぬエラーが発生しました");
      }
      setTasks([]);
    }
  };

  React.useEffect(()=>{
    apiTaskRead();
  },[]);

  return (
    <>
      <Card>
        <CardHeader
          action={!props.readonly && (
            <IconButton onClick={() => setCreateTaskDialog(true)} component="span">
              <AddIcon color="primary" />
            </IconButton>
          )}
          title="タスク"
          subheader={props.date}
        />
        {!!errorMessage && (
          <CardContent
            sx={{
              textAlign: "center",
              p: "20px !important"
            }}>{errorMessage}
          </CardContent>
        )}
        {taskReadLoading && !tasks.length && (
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              p: "30px"
            }}>
            <CircularProgress />
          </CardContent>
        )}
        {!!tasks.length && (
          <CardContent sx={{ p: "0 !important" }}>
            {tasks.map((task: apiTaskReadResponseTaskType, index: number) => (
              <TaskItem
                task={task}
                date={props.date}
                apiTaskRead={apiTaskRead}
                key={index.toString()}
                readonly={props.readonly}
              />
            ))}
          </CardContent>
        )}
      </Card>

      <Dialog open={createTaskDialog} onClose={() => setCreateTaskDialog(false)}>
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
}