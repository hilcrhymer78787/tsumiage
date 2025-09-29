import { useCallback, useEffect, useMemo } from "react";

import CalendarTable from "@/components/calendar/CalendarTable";
import ErrTxt from "@/components/common/ErrTxt";
import Loading from "@/components/common/Loading";
import { useReadWorkMonth } from "@/data/work/useReadWorkMonth";
import { useRouter } from "next/router";

const FriendDetailMain = () => {
  const router = useRouter();
  const { calendars, readWorkMonthLoading, readWorkMonthError, readWorkMonth } = useReadWorkMonth();

  const userId = useMemo(() => {
    return Number(router.query.id);
  }, [router.query]);

  const userName = useMemo(() => {
    const { name } = router.query;
    if (!name) return "";
    if (Array.isArray(name)) return "";
    return name;
  }, [router.query]);

  const year = useMemo(() => {
    return Number(router.query.year);
  }, [router.query.year]);

  const month = useMemo(() => {
    return Number(router.query.month);
  }, [router.query.month]);

  const getCalendarData = useCallback(
    async (year?: number, month?: number) => {
      await readWorkMonth({
        user_id: userId,
        year: year ?? Number(router.query.year),
        month: month ?? Number(router.query.month),
      });
    },
    [userId, readWorkMonth, router.query.month, router.query.year]
  );

  useEffect(() => {
    getCalendarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  if (router.asPath === router.route) return null;
  if (!!readWorkMonthError) return <ErrTxt txt={readWorkMonthError} />;
  if (calendars === null) {
    if (readWorkMonthLoading) return <Loading />;
    return <></>;
  }
  return <CalendarTable userName={userName} calendars={calendars} readonly />;
};
export default FriendDetailMain;
