import { Typography } from "@mui/material";

const NoData = ({ txt, testId = "NoData" }: { txt?: string; testId?: string }) => {
  if (!txt) return <></>;
  return (
    <Typography data-testid={testId} sx={{ p: 5 }}>
      {txt}
    </Typography>
  );
};
export default NoData;
