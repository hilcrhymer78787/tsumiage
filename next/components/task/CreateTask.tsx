import React, { useState } from "react";
import { apiTaskReadResponseTaskType } from "@/types/api/task/read/response";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  TextField,
  Select,
  MenuItem,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTaskApi } from "@/data/task";
import axios from "axios";

type Props = {
  task: apiTaskReadResponseTaskType | null
  onCloseMyself: () => void
}
type FormTask = {
  id: number,
  name: string,
  default_hour: number,
  default_minute: number,
  status: string | number,
  sort_key: number | null,
}
export default function CreateTask(props: Props) {
  const { taskCreate, taskCreateLoading, taskDelete, taskDeleteLoading } = useTaskApi();
  const [formTask, setFormTask] = useState<FormTask>({
    id: props.task?.id ?? 0,
    name: props.task?.name ?? "",
    default_hour: props.task ? Math.floor(props.task.default_minute / 60) : 0,
    default_minute: props.task ? props.task.default_minute % 60 : 0,
    status: props.task?.status ?? 1,
    sort_key: props.task?.sort_key ?? null,
  });
  const [nameError, setNameError] = useState<string>("");
  const apiTaskDelete = async () => {
    if (!confirm(`「${props.task?.name}」を削除しますか？`)) return;
    if (!confirm("このタスクに登録されている全ての目標や実績も削除されますが、よろしいですか？")) return;
    try {
      await taskDelete({
        task_id: formTask.id
      });
      props.onCloseMyself();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラー");
      }
    }
  };
  const apiTaskCreate = async () => {
    if (validation()) return;
    try {
      await taskCreate({
        task_id: formTask.id,
        task_name: formTask.name,
        task_status: Number(formTask.status),
        task_default_minute: formTask.default_hour * 60 + formTask.default_minute
      });
      props.onCloseMyself();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラー");
      }
    }
  };
  const validation = (): boolean => {
    setNameError("");
    if (formTask.name == "") {
      setNameError("タスクの名前は必須です");
      return true;
    }
    return false;
  };
  return (
    <Card>
      <CardHeader title={props.task ? props.task.name : "新規タスク登録"} />
      <CardContent>
        <Box sx={{ mb: "15px" }}>
          <TextField
            error={!!nameError}
            helperText={nameError}
            value={formTask.name}
            onChange={(e) => { setFormTask({ ...formTask, name: e.currentTarget.value }); }}
            label="タスクの名前" variant="outlined" color="primary" />
        </Box>
        <Box sx={{ mb: "15px" }}>
          <Typography variant="subtitle1">1日あたりの想定時間</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "48%", }}>
              <Select
                sx={{ width: "100%", }}
                value={formTask.default_hour}
                onChange={(e) => { setFormTask({ ...formTask, default_hour: Number(e.target.value) }); }}
              >
                {[...Array(24 + 1)].map((_, index) => (
                  <MenuItem key={index.toString()} value={index}>{index}時間</MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ width: "48%", }}>
              <Select
                sx={{ width: "100%", }}
                value={formTask.default_minute}
                onChange={(e) => { setFormTask({ ...formTask, default_minute: Number(e.target.value) }); }}
              >
                {[...Array(59 + 1)].map((n, index) => (
                  <MenuItem key={index.toString()} value={index}>{index}分</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>
        {/* <Box sx={{ mb: '15px' }}>
          <FormControl fullWidth>
            <InputLabel id="defaultーminute-label">ステータス</InputLabel>
            <Select
              labelId="defaultーminute-label"
              value={formTask.status}
              onChange={(e) => { setFormTask({ ...formTask, status: Number(e.target.value) }); }}
            >
              {[...Array(10 + 1)].map((n, index) => (
                <MenuItem key={index.toString()} value={index}>{index}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}
      </CardContent>
      <CardActions>
        <LoadingButton
          color="error"
          variant="contained"
          onClick={apiTaskDelete}
          loading={taskDeleteLoading}
          disabled={taskCreateLoading}>削除<DeleteIcon />
        </LoadingButton>
        <LoadingButton
          color="primary"
          variant="contained"
          onClick={apiTaskCreate}
          loading={taskCreateLoading}
          disabled={taskDeleteLoading}>登録<SendIcon />
        </LoadingButton>
      </CardActions>
    </Card>
  );
}