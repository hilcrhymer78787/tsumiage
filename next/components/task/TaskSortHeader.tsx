import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NAV_WIDTH } from "@/layouts/default";
import { useMedia } from "@/data/media/useMedia";
import { useRouter } from "next/router";

const TaskSortHeader = ({ isGray }: { isGray: boolean }) => {
  const router = useRouter();
  const { isPc } = useMedia();
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
        <Toolbar className="flexStart" disableGutters>
          <Button onClick={() => router.push("/task")}>
            <ArrowBackIcon />
            <Typography>戻る</Typography>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TaskSortHeader;
