import type { StackProps } from "@mui/material";
import { Stack } from "@mui/material";

const RStack = (props: StackProps) => {
  return (
    <Stack direction="row" alignItems="center" {...props}>
      {props.children}
    </Stack>
  );
};

export default RStack;
