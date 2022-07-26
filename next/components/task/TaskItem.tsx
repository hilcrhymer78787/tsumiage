import React from "react";
import CreateWork from "@/components/task/CreateWork";
import { apiTaskReadResponseTaskType } from "@/types/api/task/read/response";
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
import { useWorkApi } from "@/data/work";
import axios from "axios";
type Props = {
  task: apiTaskReadResponseTaskType,
  date: string
  apiTaskRead: () => void
  readonly: boolean
}
export default function TaskItem (props: Props) {
  const { workCreate, workCreateLoading, workDelete, workDeleteLoading } = useWorkApi();
  const [createWorkDialog, setCreateWorkDialog] = React.useState<boolean>(false);
  const apiWorkDelete = async () => {
    if (!confirm(`${props.date}、「${props.task.name}」の実績を削除しますか？`)) return;
    try {
      await workDelete({
        date: props.date,
        task_id: props.task.id
      });
      props.apiTaskRead();
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
        minute: props.task.default_minute,
        memo: "",
      });
      props.apiTaskRead();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラー");
      }
    }
  };
  const QuickIcon = () => {
    if (workDeleteLoading || workCreateLoading) {
      return <CircularProgress size={25} />;
    } else if (props.task.work.id) {
      return <CheckBoxIcon
        onClick={apiWorkDelete}
        color="primary"
      />;
    } else {
      return <CheckBoxOutlineBlankIcon
        onClick={apiWorkCreate}
        color="disabled"
      />;
    }
  };
  return (
    <ListItem sx={{ p: 0 }}
      secondaryAction={!Boolean(props.readonly) && (
        <QuickIcon />
      )}
    >
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
        {createWorkDialog && (
          <CreateWork
            onCloseMyself={() => {
              setCreateWorkDialog(false);
              props.apiTaskRead();
            }}
            date={props.date}
            task={props.task}
            readonly={props.readonly}
          />
        )}
      </Dialog>
    </ListItem >
  );
}
