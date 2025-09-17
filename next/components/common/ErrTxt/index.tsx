import { Typography } from "@mui/material";
const ErrTxt = ({ txt }: { txt?: string }) => {
  if (!txt) return <></>;
  return (
    <Typography color="error" sx={{ p: 5 }}>
      {txt}
    </Typography>
  );
};
export default ErrTxt;
