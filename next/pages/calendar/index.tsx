import React from "react";
import Layout from "@/layouts/default";
import CalendarList from "@/components/calendar/CalendarList";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
function Calendar() {
  const loginInfo = useRecoilValue(loginInfoAtom);
  return (
    <Layout>
      <CalendarList readonly={false} userId={loginInfo?.id ?? 0} />
    </Layout>
  );
}
export default Calendar;