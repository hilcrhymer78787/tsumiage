import { Box, IconButton, Typography } from "@mui/material";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useMemo } from "react";
import { useRouter } from "next/router";

export const PAGINATION_HEIGHT = 60;
const Pagination = () => {
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
    <Box className="flexStart" height={`${PAGINATION_HEIGHT}px`}>
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
  );
};
export default Pagination;
