import { Box, IconButton, Typography } from "@mui/material";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";

export const PAGINATION_HEIGHT = 60;

const Pagination = ({
  onClickReset,
  resetWorkLoading,
}: {
  onClickReset?: () => void;
  resetWorkLoading?: boolean;
}) => {
  const fontSize = "27px";
  const router = useRouter();

  const year = useMemo(() => {
    return Number(router.query.year);
  }, [router.query.year]);

  const month = useMemo(() => {
    return Number(router.query.month);
  }, [router.query.month]);

  const onClickPrevMonth = () => {
    router.push({
      pathname: location.pathname,
      query: {
        ...router.query,
        year: month == 1 ? year - 1 : year,
        month: month == 1 ? 12 : month - 1,
      },
    });
  };

  const onClickNextMonth = () => {
    router.push({
      pathname: location.pathname,
      query: {
        ...router.query,
        year: month == 12 ? year + 1 : year,
        month: month == 12 ? 1 : month + 1,
      },
    });
  };

  return (
    <Box className="flexBetween" height={`${PAGINATION_HEIGHT}px`} sx={{ pr: 2 }}>
      <Box className="flexStart">
        <IconButton onClick={onClickPrevMonth}>
          <NavigateBeforeIcon sx={{ fontSize }} />
        </IconButton>
        <Typography fontSize={fontSize}>
          {year}年 {month}月
        </Typography>
        <IconButton onClick={onClickNextMonth}>
          <NavigateNextIcon sx={{ fontSize }} />
        </IconButton>
      </Box>
      {!!onClickReset && (
        <LoadingButton onClick={onClickReset} loading={!!resetWorkLoading}>
          リセット
        </LoadingButton>
      )}
    </Box>
  );
};
export default Pagination;
