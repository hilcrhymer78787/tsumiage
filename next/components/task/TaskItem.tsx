import React, { useState } from "react";
import { api } from "@/plugins/axios";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import CreateWork from "@/components/task/CreateWork";
import { apiTaskReadResponseType } from "@/types/api/task/read/response";
import { apiTaskReadResponseTaskType } from "@/types/api/task/read/response";
import { apiWorkDeleteRequestType } from "@/types/api/work/delete/request";
import { apiWorkCreateRequestType } from "@/types/api/work/create/request";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Dialog,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  CircularProgress
} from "@mui/material";
type Props = {
    task: apiTaskReadResponseTaskType,
    date: string
    fetchTasks: () => void
    readonly: boolean
}
export default function TaskItem (props: Props) {
  const [workDeleteLoading, setWorkDeleteLoading] = React.useState<boolean>(false);
  const [workCreateLoading, setWorkCreateLoading] = React.useState<boolean>(false);
  const [createWorkDialog, setCreateWorkDialog] = React.useState<boolean>(false);
  const workDelete = () => {
    if (!confirm(`${props.date}、「${props.task.name}」の実績を削除しますか？`)) {
      return;
    }
    const apiParam: apiWorkDeleteRequestType = {
      date: props.date,
      task_id: props.task.id
    };
    const requestConfig: AxiosRequestConfig = {
      url: "/api/work/delete",
      method: "DELETE",
      data: apiParam
    };
    setWorkDeleteLoading(true);
    api(requestConfig)
      .then((res: AxiosResponse<apiTaskReadResponseType>) => {
        props.fetchTasks();
      })
      .finally(() => {
        setWorkDeleteLoading(false);
      });
  };
  const workCreate = () => {
    const apiParam: apiWorkCreateRequestType = {
      id: props.task.work.id,
      date: props.date,
      task_id: props.task.id,
      minute: props.task.default_minute,
      memo: "",
    };
    const requestConfig: AxiosRequestConfig = {
      url: "/api/work/create",
      method: "POST",
      data: apiParam
    };
    setWorkCreateLoading(true);
    api(requestConfig)
      .then((res) => {
        props.fetchTasks();
      })
      .finally(() => {
        setWorkCreateLoading(false);
      });
  };
  const QuickIcon = () => {
    if (workDeleteLoading || workCreateLoading) {
      return <CircularProgress size={25} />;
    } else if (props.task.work.id) {
      return <CheckBoxIcon
        onClick={workDelete}
        color="primary"
      />;
    } else {
      return <CheckBoxOutlineBlankIcon
        onClick={workCreate}
        color="disabled"
      />;
    }
  };
  return (
    <ListItem sx={{ p: 0 }}
      secondaryAction={!Boolean(props.readonly) &&
                <QuickIcon />
      }>
      <ListItemButton sx={{ p: "8px 48px 8px 16px" }}>
        <ListItemAvatar onClick={() => { setCreateWorkDialog(true); }}>
          <Avatar sx={{ background: Boolean(props.task.work.id) ? "linear-gradient(#62b1ff,#1976d2);" : "" }}>
            <TaskOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          onClick={() => { setCreateWorkDialog(true); }}
          primary={props.task.name}
          secondary={`想定:${props.task.default_minute}分` + ` 実績:${props.task.work?.minute}分`}
        />
      </ListItemButton>
      <Dialog open={createWorkDialog} onClose={() => { setCreateWorkDialog(false); }}>
        {createWorkDialog &&
                    <CreateWork
                      onCloseMyself={() => {
                        setCreateWorkDialog(false);
                        props.fetchTasks();
                      }}
                      date={props.date}
                      task={props.task}
                      readonly={props.readonly}
                    />
        }
      </Dialog>
    </ListItem >
  );
}
