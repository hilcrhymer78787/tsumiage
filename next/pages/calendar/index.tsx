import CalendarList from "@/components/calendar/CalendarList";
import Layout from "@/layouts/default";
import React from "react";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
function Calendar() {
  const loginInfo = useRecoilValue(loginInfoAtom);
  return (
    <Layout pcMaxWidth={false}>
      <CalendarList readonly={false} userId={loginInfo?.id ?? 0} />
    </Layout>
  );
}
export default Calendar;