import { Avatar } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
type Props = {
  fileName: string | undefined
  size: string
  borderColor?: string
}
//
const UserImg = (props: Props) => {
  const theme = useTheme();
  const getUserImg = () => {
    if (!props.fileName) {
      return "";
    } else if (props.fileName.slice(0, 4) == "http") {
      return props.fileName;
    } else {
      return process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + props.fileName;
    }
  };
  return (
    <Avatar
      src={getUserImg()}
      sx={{
        border: `2px solid ${props.borderColor ?? theme.palette.primary.main}`,
        width: props.size + "px",
        height: props.size + "px",
      }}
    />
  );
};
export default UserImg;
