import { Typography } from "@mui/material";
const ErrTxt = ({ txt, p = 5 }: { txt?: string; p?: string | number }) => {
  if (!txt) return <></>;
  return (
    <Typography color="error" sx={{ p }}>
      {txt}
    </Typography>
  );
};
export default ErrTxt;
