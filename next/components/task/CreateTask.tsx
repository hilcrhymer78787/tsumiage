import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ErrTxt from "@/components/common/ErrTxt";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Task } from "@/data/task/useReadTasks";
import axios from "axios";
import { useCreateTask } from "@/data/task/useCreateTask";
import { useDeleteTask } from "@/data/task/useDeleteTask";
import { useState } from "react";
import { useTaskApi } from "@/data/task";

type Props = {
  task: Task | null;
  onCloseMyself: () => void;
};
export default function CreateTask({ task, onCloseMyself }: Props) {
  const { nameError, createTaskLoading, createTask, createTaskError } =
    useCreateTask();
  const { deleteTask, deleteTaskLoading } = useDeleteTask();
  const [name, setName] = useState(task?.name ?? "");
  const onClickDelete = async () => {
    if (!task) return;
    if (!confirm(`「${task.name}」を削除しますか？`)) return;
    if (!confirm("このタスクに登録されている全ての実績も削除されます")) return;
    const res = await deleteTask(task.id);
    if (res) onCloseMyself();
  };
  const onClickSubmit = async () => {
    const res = await createTask(task?.id ?? 0, name);
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
        <ErrTxt txt={createTaskError} />
      </CardContent>
      <CardActions>
        {!!task && (
          <LoadingButton
            color="error"
            variant="contained"
            onClick={onClickDelete}
            loading={deleteTaskLoading}
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
          disabled={deleteTaskLoading}
        >
          登録
          <SendIcon />
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
