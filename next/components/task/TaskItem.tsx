import {
  CircularProgress,
  Dialog,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { WorkState, useCreateWork } from "@/data/work/useCreateWork";

import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CreateTask from "@/components/task/CreateTask";
import RemoveIcon from "@mui/icons-material/Remove";
import { Task } from "@/data/task/useReadTasks";
import { useDeleteWork } from "@/data/work/useDeleteWork";
import { useState } from "react";

type Props = {
  task: Task;
  date: string;
  apiTaskRead: () => void;
  readonly: boolean;
};
export default function TaskItem({ task, date, apiTaskRead, readonly }: Props) {
  const { deleteWork, deleteWorkLoading } = useDeleteWork();
  const [createTaskkDialog, setCreateTaskDialog] = useState(false);
  const { createWork, createWorkLoading } = useCreateWork();
  const apiWorkDelete = async () => {
    const res = await deleteWork(task.work.id);
    if (res) apiTaskRead();
  };
  const apiWorkCreate = async (state: WorkState) => {
    const res = await createWork({
      id: task.work.id,
      date: date,
      state,
      task_id: task.id,
    });
    if (res) apiTaskRead();
  };
  const IsDoneIcon = () => {
    if (deleteWorkLoading || createWorkLoading) {
      return <CircularProgress size={25} />;
    } else if (task.work.state === 1) {
      return (
        <IconButton onClick={apiWorkDelete}>
          <CheckBoxIcon color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => apiWorkCreate(1)}>
          <CheckBoxOutlineBlankIcon color="disabled" />
        </IconButton>
      );
    }
  };
  const IsNecessaryIcon = () => {
    if (deleteWorkLoading || createWorkLoading) {
      return <CircularProgress size={25} />;
    } else if (task.work.state === 2) {
      return (
        <IconButton onClick={apiWorkDelete}>
          <AddIcon color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => apiWorkCreate(2)}>
          <RemoveIcon color="disabled" />
        </IconButton>
      );
    }
  };
  return (
    <ListItem sx={{ p: 0 }} secondaryAction={!readonly && <IsNecessaryIcon />}>
      <ListItemButton sx={{ p: "8px 48px 8px 16px" }}>
        <ListItemAvatar>
          <IsDoneIcon />
        </ListItemAvatar>
        <ListItemText
          onClick={() => setCreateTaskDialog(true)}
          primary={task.name}
        />
      </ListItemButton>
      <Dialog
        open={createTaskkDialog}
        onClose={() => setCreateTaskDialog(false)}
      >
        {createTaskkDialog && (
          <CreateTask
            onCloseMyself={() => {
              setCreateTaskDialog(false);
              apiTaskRead();
            }}
            task={task}
          />
        )}
      </Dialog>
    </ListItem>
  );
}
