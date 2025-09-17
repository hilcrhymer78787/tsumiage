import { Avatar } from "@mui/material";
import { useMemo } from "react";

const UserImg = ({
  fileName,
  size,
  borderColor,
}: {
  fileName: string | undefined;
  size: string;
  borderColor?: string;
}) => {
  const userImg = useMemo(() => {
    if (!fileName) return "";
    if (fileName.slice(0, 4) == "http") return fileName;
    return process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + fileName;
  }, [fileName]);

  return (
    <Avatar
      src={userImg}
      sx={{
        border: "2px solid",
        borderColor: borderColor ?? "primary.main",
        width: size + "px",
        height: size + "px",
      }}
    />
  );
};
export default UserImg;
