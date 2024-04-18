import { useCallback, useEffect, useMemo } from "react";

import CalendarTable from "@/components/calendar/CalendarTable";
import ErrTxt from "@/components/common/ErrTxt";
import Layout from "@/layouts/default";
import Loading from "@/components/common/Loading";
import { Typography } from "@mui/material";
import { useReadWorkMonth } from "@/data/work/useReadWorkMonth";
import { useRouter } from "next/router";

const FriendId = () => {
  const router = useRouter();
  const { calendars, readWorkMonthLoading, readWorkMonthError, readWorkMonth } =
  useReadWorkMonth();

  const userId=useMemo(()=>{
    return Number(router.query.user?.[0]);
  },[router.query.user]);
  
  const getCalendarData = useCallback(
    async (year?: number, month?: number) => {
      await readWorkMonth({
        userId,
        year: year ?? Number(router.query.year),
        month: month ?? Number(router.query.month),
      });
    },
    [userId, readWorkMonth, router.query.month, router.query.year]
  );
  
  useEffect(() => {
    getCalendarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const CalendarContent = useCallback(() => {
    if (!!readWorkMonthError) return <ErrTxt txt={readWorkMonthError} />;
    if (calendars === null) {
      if (readWorkMonthLoading) return <Loading />;
      return <></>;
    }
    return (
      <CalendarTable calendars={calendars} getCalendarData={getCalendarData} />
    );
  }, [readWorkMonthLoading, readWorkMonthError, calendars, getCalendarData]);

  if (router.asPath === router.route) return null;
  if (!router.query.user) return null;

  return (
    <Layout pcMaxWidth={false}>
      <Typography
        color="primary"
        variant="h5"
        sx={{
          textAlign: "center",
          m: "15px 0"
        }}>{router.query.user[1]}さんの部屋</Typography>
      <CalendarContent />
    </Layout>
  );
};
export default FriendId;
