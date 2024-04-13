import {
  CircularProgress,
  Dialog,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CreateTask from "@/components/task/CreateTask";
import { Task } from "@/data/task/useReadTasks";
import { useCreateWork } from "@/data/work/useCreateWork";
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
  const apiWorkCreate = async () => {
    const res = await createWork({
      id: task.work.id,
      date: date,
      state: 1,
      task_id: task.id,
    });
    if (res) apiTaskRead();
  };
  const QuickIcon = () => {
    if (deleteWorkLoading || createWorkLoading) {
      return <CircularProgress size={25} />;
    } else if (task.work.state === 1) {
      return <CheckBoxIcon onClick={apiWorkDelete} color="primary" />;
    } else {
      return (
        <CheckBoxOutlineBlankIcon onClick={apiWorkCreate} color="disabled" />
      );
    }
  };
  return (
    <ListItem sx={{ p: 0 }} secondaryAction={!readonly && <QuickIcon />}>
      <ListItemButton sx={{ p: "8px 48px 8px 16px" }}>
        <ListItemAvatar onClick={() => setCreateTaskDialog(true)}>
          <QuickIcon />
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
