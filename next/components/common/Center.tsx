import type { BoxProps } from "@mui/material";
import { Box } from "@mui/material";

const Center = ({ children, ...props }: BoxProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...props}>
      {children}
    </Box>
  );
};

export default Center;
