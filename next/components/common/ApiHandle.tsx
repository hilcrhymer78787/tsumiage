import { Box, CircularProgress, Typography } from "@mui/material";
import type { ReactNode } from "react";

const ApiHandle = ({
  errorTxt = null,
  noDataTxt = null,
  isLoading = false,
  isError = false,
  isNoData = false,
  p = "0px",
  children,
}: {
  errorTxt?: string | null;
  noDataTxt?: string | null;
  isLoading?: boolean;
  isError?: boolean;
  isNoData?: boolean;
  p?: string | number;
  children: ReactNode;
}) => {
  if (isError) {
    return (
      <Box p={p}>
        <Typography color="error">{errorTxt}</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={p}>
        <CircularProgress color="primary" size={40} thickness={4} aria-label="読み込み中" />
      </Box>
    );
  }

  if (isNoData) {
    return (
      <Box p={p}>
        <Typography>{noDataTxt}</Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ApiHandle;
