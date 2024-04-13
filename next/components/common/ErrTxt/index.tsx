import { Typography } from "@mui/material";
export type Props = {
  txt?: string;
};
const ErrTxt = ({ txt }: Props) => {
  if (!txt) return <></>;
  return (
    <Typography color="error" sx={{ p: 5 }}>
      {txt}
    </Typography>
  );
};
export default ErrTxt;
