import { Typography } from "@mui/material";
export type Props = {
  txt?: string;
  testId?: string;
};
const NoData = ({ txt, testId = "NoData" }: Props) => {
  if (!txt) return <></>;
  return (
    <Typography data-testid={testId} sx={{ p: 5 }}>
      {txt}
    </Typography>
  );
};
export default NoData;
