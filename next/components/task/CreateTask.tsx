import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { apiTaskReadResponseTaskType } from "@/types/api/task/read/response";
import axios from "axios";
import { useCreateTask } from "@/data/task/useCreateTask";
import { useState } from "react";
import { useTaskApi } from "@/data/task";

type Props = {
  task: apiTaskReadResponseTaskType | null;
  onCloseMyself: () => void;
};
export default function CreateTask({ task, onCloseMyself }: Props) {
  const taskId = task?.id ?? 0;
  const { nameError, createTaskLoading, createTask, createTaskError } =
    useCreateTask();
  const { taskDelete, taskDeleteLoading } = useTaskApi();
  const [name, setName] = useState(task?.name ?? "");
  const apiTaskDelete = async () => {
    if (!confirm(`「${task?.name}」を削除しますか？`)) return;
    if (
      !confirm(
        "このタスクに登録されている全ての目標や実績も削除されますが、よろしいですか？"
      )
    )
      return;
    try {
      await taskDelete({
        task_id: taskId,
      });
      onCloseMyself();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラー");
      }
    }
  };
  const onClickSubmit = async () => {
    const res = await createTask(taskId, name);
    if (res) onCloseMyself();
  };
  return (
    <Card>
      <CardHeader title={task ? task.name : "新規タスク登録"} />
      <CardContent>
        <TextField
          error={!!nameError}
          helperText={nameError}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          label="タスクの名前"
          variant="outlined"
          color="primary"
        />
      </CardContent>
      <CardActions>
        {!!task && (
          <LoadingButton
            color="error"
            variant="contained"
            onClick={apiTaskDelete}
            loading={taskDeleteLoading}
            disabled={createTaskLoading}
          >
            削除
            <DeleteIcon />
          </LoadingButton>
        )}
        <LoadingButton
          color="primary"
          variant="contained"
          onClick={onClickSubmit}
          loading={createTaskLoading}
          disabled={taskDeleteLoading}
        >
          登録
          <SendIcon />
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
