import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMedia } from "@/data/media/useMedia";
import { useRouter } from "next/router";

type TaskSortHeaderProps = {
  isGray: boolean;
};
const TaskSortHeader = ({isGray}:TaskSortHeaderProps) => {
  const router = useRouter();
  const { isPc } = useMedia();
  const style = {
    backgroundImage: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
  };
  return (
    <AppBar style={!isGray ? style : {}} position="fixed" sx={{ paddingLeft: isPc ? "170px" : 0 }}>
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
