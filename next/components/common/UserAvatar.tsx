import { Avatar, SxProps } from "@mui/material";
type UserAvatarProps = {
  src: string
  size: number
  borderColor?: string
  sx?: SxProps
  onClick?: () => void
}
const UserAvatar = ({
  src,
  size,
  borderColor = "white",
  sx,
  onClick,
}: UserAvatarProps) => {
  return (
    <Avatar
      src={src}
      sx={{
        ...sx,
        border: `2px solid ${borderColor}`,
        width: `${size}px`,
        height: `${size}px`,
        cursor: onClick ? "pointer" : "auto",
      }}
      onClick={() => {
        if (onClick) onClick();
      }}
    />
  );
};
export default UserAvatar;
