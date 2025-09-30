import { Box, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ErrTxt from "@/components/common/ErrTxt";
import { KeyboardEvent } from "react";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useCreateTask } from "@/data/task/useCreateTask";
import { useDeleteTask } from "@/data/task/useDeleteTask";
import { useState } from "react";
import { Task } from "@/data/types/task";

const CreateTask = ({ task, onCloseMyself }: { task: Task | null; onCloseMyself: () => void }) => {
  const { nameError, createTaskLoading, createTask, error: createTaskError } = useCreateTask();
  const { deleteTask, isLoading: deleteTaskLoading } = useDeleteTask();
  const [name, setName] = useState(task?.name ?? "");

  const onClickDelete = async () => {
    if (!task) return;
    if (!confirm(`「${task.name}」を削除しますか？`)) return;
    if (!confirm("このタスクに登録されている全ての実績も削除されます")) return;
    const res = await deleteTask({ id: task.id });
    if (res) onCloseMyself();
  };

  const submit = async () => {
    const res = await createTask({ id: task?.id, name });
    if (res) onCloseMyself();
  };

  const onKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e?.key === "Enter") submit();
  };

  return (
    <Card>
      <CardHeader title={task?.name ?? "新規タスク登録"} />
      <CardContent>
        <TextField
          error={!!nameError}
          helperText={nameError}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          onKeyDown={onKeyDown}
          label="タスクの名前"
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
        <Box />
        <LoadingButton
          variant="contained"
          onClick={submit}
          loading={createTaskLoading}
          disabled={deleteTaskLoading}
        >
          登録
          <SendIcon />
        </LoadingButton>
      </CardActions>
    </Card>
  );
};
export default CreateTask;
