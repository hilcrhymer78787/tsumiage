import React, { useState, useEffect } from "react";
import { api } from "@/plugins/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiTaskReadResponseType } from "@/types/api/task/read/response";
import { apiTaskReadResponseTaskType } from "@/types/api/task/read/response";
import { apiWorkCreateRequestType } from "@/types/api/work/create/request";
import { apiWorkDeleteRequestType } from "@/types/api/work/delete/request";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateTask from "@/components/task/CreateTask";
import { LoadingButton } from "@mui/lab";
import {
  TextareaAutosize,
  Select,
  MenuItem,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
} from "@mui/material";

type Props = {
  date: string,
  task: apiTaskReadResponseTaskType
  onCloseMyself: () => void
  readonly: boolean
}
export default function CreateWork (props: Props) {
  const [workCreateLoading, setWorkCreateLoading] = useState<boolean>(false);
  const [workDeleteLoading, setWorkDeleteLoading] = useState<boolean>(false);
  const [createTaskDialog, setCreateTaskDialog] = useState<boolean>(false);
  const [formMinute, setFormMinute] = useState<number>(0);
  const [formHour, setFormHour] = useState<number>(0);
  const [formMemo, setFormMemo] = useState<string>("");
  const workDelete = () => {
    if (!confirm(`「${props.task.name}」の実績を削除しますか？`)) {
      return;
    }
    const apiParam = {
      date: props.date,
      task_id: props.task.id
    };
    const requestConfig: AxiosRequestConfig<apiWorkDeleteRequestType> = {
      url: "/api/work/delete",
      method: "DELETE",
      data: apiParam
    };
    setWorkDeleteLoading(true);
    api(requestConfig)
      .then((res: AxiosResponse<apiTaskReadResponseType>) => {
        props.onCloseMyself();
      })
      .finally(() => {
        setWorkDeleteLoading(false);
      });
  };
  const workCreate = () => {
    const apiParam = {
      id: props.task.work.id,
      date: props.date,
      task_id: props.task.id,
      minute: formHour * 60 + formMinute,
      memo: formMemo,
    };
    const requestConfig: AxiosRequestConfig<apiWorkCreateRequestType> = {
      url: "/api/work/create",
      method: "POST",
      data: apiParam
    };
    setWorkCreateLoading(true);
    api(requestConfig)
      .then((res: AxiosResponse<apiTaskReadResponseType>) => {
        props.onCloseMyself();
      })
      .finally(() => {
        setWorkCreateLoading(false);
      });
  };
  const onChangeMemo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormMemo(event.target.value);
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
        action={!Boolean(props.readonly) && (
          <IconButton onClick={() => { setCreateTaskDialog(true); }} color="primary">
            <SettingsIcon />
          </IconButton>
        )}
        title={props.task.name}
        subheader={props.date}
      />
      <CardContent>
        <ul>
          <li>
            <Box sx={{ mb: "20px" }}>
              <h4>実績時間</h4>
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
          </li>
          <li>
            <Box sx={{ mb: "20px" }}>
              <h4>メモ</h4>
              <TextareaAutosize
                readOnly={props.readonly}
                onChange={onChangeMemo}
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
          </li>
        </ul>
      </CardContent>
      {!Boolean(props.readonly) && (
        <CardActions>
          <LoadingButton
            onClick={workDelete}
            color="error"
            variant="contained"
            loading={workDeleteLoading}
            disabled={workCreateLoading}>削除<DeleteIcon />
          </LoadingButton>
          <LoadingButton
            onClick={workCreate}
            color="primary"
            variant="contained"
            loading={workCreateLoading}
            disabled={workDeleteLoading}>登録<SendIcon />
          </LoadingButton>
        </CardActions>
      )}
      <Dialog open={createTaskDialog} onClose={() => { setCreateTaskDialog(false); }}>
        {createTaskDialog &&(
          <CreateTask
            onCloseMyself={() => {
              setCreateTaskDialog(false);
              props.onCloseMyself();
            }}
            task={props.task}
          />
        )}
      </Dialog>
    </Card>
  );
}