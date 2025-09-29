import { useCallback, useEffect, useMemo } from "react";

import CalendarTable from "@/components/calendar/CalendarTable";
import ErrTxt from "@/components/common/ErrTxt";
import Loading from "@/components/common/Loading";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useReadWorkMonth } from "@/data/work/useReadWorkMonth";

import { useRouter } from "next/router";
import { useResetWork } from "@/data/work/useResetWork";
import { LinearProgress } from "@mui/material";
import dayjs from "dayjs";

const CalendarMain = () => {
  const router = useRouter();
  const { loginInfo } = useLoginInfo();
  const { resetWork, resetWorkLoading } = useResetWork();
  const { calendars, myTomonthCalendars, readWorkMonthLoading, readWorkMonthError, readWorkMonth } =
    useReadWorkMonth();

  const year = useMemo(() => {
    return Number(router.query.year);
  }, [router.query.year]);

  const month = useMemo(() => {
    return Number(router.query.month);
  }, [router.query.month]);

  const userId = useMemo(() => {
    if (!loginInfo?.id) return 0;
    return loginInfo.id;
  }, [loginInfo]);

  const getCalendarData = useCallback(async () => {
    await readWorkMonth({ user_id: userId, year, month });
  }, [userId, month, readWorkMonth, year]);

  const displayCalendars = useMemo(() => {
    const isTomonth =
      Number(dayjs().format("YYYY")) === year && Number(dayjs().format("M")) === month;
    return isTomonth ? myTomonthCalendars : calendars;
  }, [calendars, month, myTomonthCalendars, year]);

  const onClickReset = useCallback(async () => {
    if (!confirm("活動情報を全て削除しますか？")) return;
    if (!confirm("本当によろしいですか？")) return;
    await resetWork();
    await getCalendarData();
  }, [getCalendarData, resetWork]);

  useEffect(() => {
    getCalendarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  if (!!readWorkMonthError) return <ErrTxt txt={readWorkMonthError} />;
  if (displayCalendars === null) {
    if (readWorkMonthLoading) return <Loading />;
    return <></>;
  }
  return (
    <>
      {!!readWorkMonthLoading && (
        <LinearProgress sx={{ position: "fixed", top: 0, width: "100%" }} />
      )}
      <CalendarTable
        calendars={displayCalendars}
        onClickReset={onClickReset}
        resetWorkLoading={resetWorkLoading}
      />
    </>
  );
};
export default CalendarMain;
