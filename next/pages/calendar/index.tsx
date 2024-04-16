import { useEffect, useMemo } from "react";

import CalendarList from "@/components/calendar/CalendarList";
import Layout from "@/layouts/default";
import { loginInfoAtom } from "@/data/user";
import { useReadWorkMonth } from "@/data/work/useReadWorkMonth";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const Calendar = () => {
  const router = useRouter();
  const loginInfo = useRecoilValue(loginInfoAtom);
  const { calendars, readWorkMonth } = useReadWorkMonth();

  const getCalendarData = async (year?: number, month?: number) => {
    if (!loginInfo?.id) return;
    await readWorkMonth({
      userId: loginInfo.id,
      year: year ?? Number(router.query.year),
      month: month ?? Number(router.query.month),
    });
  };

  useEffect(() => {
    getCalendarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout pcMaxWidth={false}>
      <CalendarList calendars={calendars} getCalendarData={getCalendarData} />
    </Layout>
  );
};
export default Calendar;
