import { AppBar, Container, IconButton, Toolbar } from "@mui/material";

import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useRouter } from "next/router";

type TaskHeaderProps = {
  isGray: boolean;
};
const TaskHeader = ({ isGray }: TaskHeaderProps) => {
  const router = useRouter();
  const style = {
    backgroundImage: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
  };
  return (
    <AppBar
      style={!isGray ? style : {}}
      position="fixed"
      sx={{ paddingLeft: "170px" }}
    >
      <Container sx={{ p: "0 10px" }} maxWidth="lg">
        <Toolbar className="flexEnd" disableGutters>
          <IconButton onClick={() => router.push("/task/sort")}>
            <SwapVertIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TaskHeader;
