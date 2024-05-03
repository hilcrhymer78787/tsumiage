import { useCallback, useEffect, useMemo } from "react";

import CalendarTable from "@/components/calendar/CalendarTable";
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

  const year = useMemo(() => {
    return Number(router.query.year);
  }, [router.query.year]);

  const month = useMemo(() => {
    return Number(router.query.month);
  }, [router.query.month]);

  const getCalendarData = useCallback(async () => {
    const userId = loginInfo?.id;
    if (!userId) return;
    await readWorkMonth({ userId, year, month });
  }, [loginInfo?.id, month, readWorkMonth, year]);

  useEffect(() => {
    getCalendarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  const CalendarContent = useCallback(() => {
    if (!!readWorkMonthError) return <ErrTxt txt={readWorkMonthError} />;
    if (calendars === null) {
      if (readWorkMonthLoading) return <Loading />;
      return <></>;
    }
    return (
      <CalendarTable calendars={calendars} />
    );
  }, [readWorkMonthLoading, readWorkMonthError, calendars]);

  return (
    <Layout pcMaxWidth={false} spP="0 !important" pcP="0 !important">
      <CalendarContent />
    </Layout>
  );
};
export default Calendar;
