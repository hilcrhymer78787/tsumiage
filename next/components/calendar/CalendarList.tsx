import { Box, Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect } from "react";

import Pagination from "@/components/calendar/Pagination";
import dayjs from "dayjs";
import { useReadWorkMonth } from "@/data/work/useReadWorkMonth";
import { useRouter } from "next/router";

type Props = {
  userId: number;
  readonly: boolean;
};
const CalendarList = (props: Props) => {
  const router = useRouter();
  const { calendars, readWorkMonth } = useReadWorkMonth();
  useEffect(() => {
    getCalendarData(year(), month());
  }, []);

  const year = (): number => {
    return Number(router.query.year);
  };
  const month = (): number => {
    return Number(router.query.month);
  };
  const day = (): number => {
    return Number(router.query.day);
  };
  const firstDay = (): number => {
    return dayjs(`${year()}/${month()}/1`, "YYYY-MM-DD").day();
  };
  const lastDayCount = (): number => {
    return (
      6 - dayjs(`${year()}/${month()}/1`, "YYYY-MM-DD").endOf("month").day()
    );
  };
  const getCalendarData = async (year: number, month: number) => {
    await readWorkMonth({
      userId: props.userId,
      year: year,
      month: month,
    });
  };

  return (
    <>
      <Card sx={{ mb: "20px" }}>
        <CardHeader
          title={
            <Pagination
              setCalendarData={(date) => {
                getCalendarData(date.year, date.month);
              }}
            />
          }
        />
        <CardContent sx={{ p: "0 !important" }}>
          <Box className="flexStart" sx={{ alignItems: "flex-end" }}>
            <Box sx={{ width: "100px" }}>
              <Box></Box>
              {calendars?.[0]?.tasks.map((task) => (
                <>
                  <Box sx={{ p: 1, fontSize: "14px" }} key={task.id}>
                    {task.name}
                  </Box>
                </>
              ))}
            </Box>
            <Box
              sx={{ overflow: "scroll", width: "calc(100% - 100px)" }}
              className="flexStart"
            >
              {calendars?.map((calendar) => (
                <Box key={calendar.date} sx={{ textAlign: "center" }}>
                  <Box sx={{ p: 1, width: "40px" }}>
                    {dayjs(calendar.date).format("D")}
                  </Box>
                  {calendar.tasks.map((task) => (
                    <>
                      <Box sx={{ p: 1 }} key={task.id}>
                        {task.work.state}
                      </Box>
                    </>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
      <pre>{JSON.stringify(calendars, null, 4)}</pre>
    </>
  );
};
export default CalendarList;
