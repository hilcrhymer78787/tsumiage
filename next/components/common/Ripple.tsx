import type { ButtonProps } from "@mui/material";
import { Box, Button } from "@mui/material";

const Ripple = (props: ButtonProps) => {
  return (
    <Button
      aria-label="ボタン"
      {...props}
      component="span"
      sx={{
        p: 0,
        display: "block",
        width: "100%",
        color: "inherit",
        textAlign: "left",
        ...props.sx,
      }}
    >
      <Box>{props.children}</Box>
    </Button>
  );
};
export default Ripple;
