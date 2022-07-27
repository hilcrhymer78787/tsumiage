import * as React from "react";
import {
  Avatar,
} from "@mui/material";
type Props = {
  fileName: string | undefined
  size: string
}
const UserImg = (props: Props) => {
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
        border: "2px solid #1976d2",
        width: props.size + "px",
        height: props.size + "px",
      }}
    />
  );
};
export default UserImg;
