import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import CreateTask from "@/components/task/CreateTask";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import { apiTaskReadResponseTaskType } from "@/types/api/task/read/response";
import axios from "axios";
import { useWorkApi } from "@/data/work";

type Props = {
  date: string,
  task: apiTaskReadResponseTaskType
  onCloseMyself: () => void
  readonly: boolean
}
export default function CreateWork(props: Props) {
  const { workCreate, workCreateLoading, workDelete, workDeleteLoading } = useWorkApi();
  const [createTaskDialog, setCreateTaskDialog] = useState<boolean>(false);
  const [formMinute, setFormMinute] = useState<number>(0);
  const [formHour, setFormHour] = useState<number>(0);
  const [formMemo, setFormMemo] = useState<string>("");
  const apiWorkDelete = async () => {
    if (!confirm(`「${props.task.name}」の実績を削除しますか？`)) return;
    try {
      await workDelete({
        date: props.date,
        task_id: props.task.id
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
  const apiWorkCreate = async () => {
    try {
      await workCreate({
        id: props.task.work.id,
        date: props.date,
        task_id: props.task.id,
        minute: formHour * 60 + formMinute,
        memo: formMemo,
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

  useEffect(() => {
    if (props.task.work.minute) {
      setFormHour(Math.floor(Number(props.task.work.minute) / 60));
      setFormMinute(Number(props.task.work.minute) % 60);
    } else {
      setFormHour(Math.floor(Number(props.task.default_minute) / 60));
      setFormMinute(props.task.default_minute % 60);
    }
    setFormMemo(props.task.work.memo ? props.task.work.memo : "");
  }, []);
  return (
    <Card>
      <CardHeader
        action={!props.readonly && (
          <IconButton onClick={() => { setCreateTaskDialog(true); }} color="primary">
            <SettingsIcon />
          </IconButton>
        )}
        title={props.task.name}
        subheader={props.date}
      />
      <CardContent>
        <Box sx={{ mb: "20px" }}>
          <Typography variant="subtitle1">実績時間</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "48%", }}>
              <Select
                readOnly={props.readonly}
                sx={{ width: "100%", }}
                value={formHour}
                onChange={(e) => { setFormHour(Number(e.target.value)); }}
              >
                {[...Array(24 + 1)].map((n, index) => (
                  <MenuItem key={index.toString()} value={index}>{index}時間</MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ width: "48%", }}>
              <Select
                readOnly={props.readonly}
                sx={{ width: "100%", }}
                value={formMinute}
                onChange={(e) => { setFormMinute(Number(e.target.value)); }}
              >
                {[...Array(59 + 1)].map((n, index) => (
                  <MenuItem key={index.toString()} value={index}>{index}分</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: "20px" }}>
          <Typography variant="subtitle1">メモ</Typography>
          <TextareaAutosize
            readOnly={props.readonly}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setFormMemo(e.target.value);
            }}
            value={formMemo}
            minRows={6}
            placeholder="memo"
            style={{
              width: "100%",
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
              padding: "5px",
            }}
          />
        </Box>
      </CardContent>
      {!props.readonly && (
        <CardActions>
          <LoadingButton
            onClick={apiWorkDelete}
            color="error"
            variant="contained"
            loading={workDeleteLoading}
            disabled={workCreateLoading}>削除<DeleteIcon />
          </LoadingButton>
          <LoadingButton
            onClick={apiWorkCreate}
            color="primary"
            variant="contained"
            loading={workCreateLoading}
            disabled={workDeleteLoading}>登録<SendIcon />
          </LoadingButton>
        </CardActions>
      )}
      <Dialog open={createTaskDialog} onClose={() => { setCreateTaskDialog(false); }}>
        {createTaskDialog && (
          <CreateTask
            onCloseMyself={() => {
              setCreateTaskDialog(false);
              props.onCloseMyself();
            }}
            task={props.task as any}
          />
        )}
      </Dialog>
    </Card>
  );
}