import {
  Box,
  CircularProgress,
  Dialog,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCreateWork } from "@/data/work/useCreateWork";

import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CreateTask from "@/components/task/CreateTask";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDeleteWork } from "@/data/work/useDeleteWork";
import { useState } from "react";
import { Task } from "@/data/types/task";
import { WorkState } from "@/data/types/work";
import RStack from "../common/RStack";

const TaskItem = ({
  task,
  date,
  apiTaskRead,
}: {
  task: Task;
  date: string;
  apiTaskRead: () => void;
}) => {
  const [isLoadingRight, setIsLoadingRight] = useState(false);
  const { deleteWork, isLoading } = useDeleteWork();
  const [createTaskkDialog, setCreateTaskDialog] = useState(false);
  const { createWork, createWorkLoading } = useCreateWork();

  const apiWorkDelete = async (isRight: boolean) => {
    if (isRight) setIsLoadingRight(true);
    const res = await deleteWork({ id: task.work.id });
    if (res) apiTaskRead();
    if (isRight) setIsLoadingRight(false);
  };

  const apiWorkCreate = async (state: WorkState, isRight: boolean) => {
    if (isRight) setIsLoadingRight(true);
    const res = await createWork({
      date,
      state,
      task_id: task.id,
    });
    if (res) apiTaskRead();
    if (isRight) setIsLoadingRight(false);
  };

  const IsDoneIcon = () => {
    if (isLoading || createWorkLoading) {
      if (isLoadingRight) return <></>;
      return <CircularProgress size={25} />;
    } else if (task.work.state === 1) {
      return (
        <IconButton onClick={() => apiWorkDelete(false)}>
          <CheckBoxIcon color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => apiWorkCreate(1, false)}>
          <CheckBoxOutlineBlankIcon color="disabled" />
        </IconButton>
      );
    }
  };
  const IsNecessaryIcon = () => {
    if (isLoading || createWorkLoading) {
      if (!isLoadingRight) return <></>;
      return <CircularProgress size={25} />;
    } else if (task.work.state === 2) {
      return (
        <IconButton onClick={() => apiWorkDelete(true)}>
          <AddIcon color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => apiWorkCreate(2, true)}>
          <RemoveIcon color="disabled" />
        </IconButton>
      );
    }
  };
  return (
    <ListItem
      sx={{ p: 0 }}
      secondaryAction={
        <RStack>
          <IsNecessaryIcon />
          <IsDoneIcon />
        </RStack>
      }
    >
      <ListItemButton onClick={() => setCreateTaskDialog(true)}>
        <ListItemText primary={task.name} />
      </ListItemButton>
      <Dialog open={createTaskkDialog} onClose={() => setCreateTaskDialog(false)}>
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
};
export default TaskItem;
