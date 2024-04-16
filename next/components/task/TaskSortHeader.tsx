import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const TaskSortHeader = () => {
  const router = useRouter();
  return (
    <AppBar position="fixed" sx={{ paddingLeft: "170px" }}>
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
