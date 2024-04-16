import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      data-testid="Loading"
      sx={{
        p: 5,
        m: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
export default Loading;
