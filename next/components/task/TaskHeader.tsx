import {
  AppBar,
  Button,
  Container,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CreateTask from "@/components/task/CreateTask";
import { NAV_WIDTH } from "@/layouts/default";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useMedia } from "@/data/media/useMedia";
import { useRouter } from "next/router";
import { useState } from "react";

type TaskHeaderProps = {
  isGray: boolean;
  apiTaskRead: () => void;
};
const TaskHeader = ({ isGray, apiTaskRead }: TaskHeaderProps) => {
  const router = useRouter();
  const { isPc } = useMedia();
  const [createTaskDialog, setCreateTaskDialog] = useState(false);
  const style = {
    backgroundImage: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
  };
  return (
    <AppBar
      style={!isGray ? style : {}}
      position="fixed"
      sx={{ paddingLeft: isPc ? `${NAV_WIDTH}px` : 0 }}
    >
      <Container sx={{ p: "0 10px" }} maxWidth="lg">
        <Toolbar className="flexBetween" disableGutters>
          <IconButton onClick={() => router.push("/task/sort")}>
            <SwapVertIcon />
          </IconButton>
          <Button onClick={() => setCreateTaskDialog(true)}>
            <AddIcon sx={{ marginTop: "-4px" }} color="primary" />
            <Typography>新規</Typography>
          </Button>
        </Toolbar>
      </Container>
      <Dialog
        open={createTaskDialog}
        onClose={() => setCreateTaskDialog(false)}
      >
        {createTaskDialog && (
          <CreateTask
            onCloseMyself={() => {
              setCreateTaskDialog(false);
              apiTaskRead();
            }}
            task={null}
          />
        )}
      </Dialog>
    </AppBar>
  );
};
export default TaskHeader;
