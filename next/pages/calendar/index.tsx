import { useCallback, useEffect } from "react";

import CalendarList from "@/components/calendar/CalendarList";
import ErrTxt from "@/components/common/ErrTxt";
import Layout from "@/layouts/default";
import Loading from "@/components/common/Loading";
import { loginInfoAtom } from "@/data/user";
import { useReadWorkMonth } from "@/data/work/useReadWorkMonth";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const Calendar = () => {
  const router = useRouter();
  const loginInfo = useRecoilValue(loginInfoAtom);
  const { calendars, readWorkMonthLoading, readWorkMonthError, readWorkMonth } =
    useReadWorkMonth();

  const getCalendarData = useCallback(
    async (year?: number, month?: number) => {
      if (!loginInfo?.id) return;
      await readWorkMonth({
        userId: loginInfo.id,
        year: year ?? Number(router.query.year),
        month: month ?? Number(router.query.month),
      });
    },
    [loginInfo, readWorkMonth, router.query.month, router.query.year]
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
      <CalendarList calendars={calendars} getCalendarData={getCalendarData} />
    );
  }, [readWorkMonthLoading, readWorkMonthError, calendars, getCalendarData]);

  return (
    <Layout pcMaxWidth="lg" spP="10px" pcP="32px 24px 0">
      <CalendarContent />
    </Layout>
  );
};
export default Calendar;
