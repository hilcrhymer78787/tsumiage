import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { WorkState, useCreateWork } from "@/data/work/useCreateWork";

import CheckIcon from "@mui/icons-material/Check";
import Pagination from "@/components/calendar/Pagination";
import RemoveIcon from "@mui/icons-material/Remove";
import { Task } from "@/data/task/useReadTasks";
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
  const { createWork, createWorkLoading } = useCreateWork();

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

  const getStateIcon = (task: Task, date: string) => {
    const {
      work: { state },
      createdAt,
    } = task;

    const apiWorkCreate = async () => {
      const newState = state === 0 ? 1 : state === 1 ? 2 : 0;
      const res = await createWork({
        id: task.work.id,
        date: date,
        state: newState,
        task_id: task.id,
      });
      if (res) getCalendarData(year(), month());
    };

    if (dayjs(date).isAfter(dayjs(), "day")) return <></>;
    if (dayjs(createdAt).isAfter(dayjs(date), "day")) return <></>;
    if (state === 0) return <CheckIcon onClick={apiWorkCreate} />;
    if (state === 1)
      return <CheckIcon onClick={apiWorkCreate} color="primary" />;
    if (state === 2)
      return <RemoveIcon onClick={apiWorkCreate} color="primary" />;
  };

  const height = "40px";
  const borderBottom = "1px solid rgba(255, 255, 255, 0.23)";
  const borderLeft = "1px solid rgba(255, 255, 255, 0.23)";

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
            <Box sx={{ width: "150px" }}>
              <Box sx={{ borderBottom }}></Box>
              {calendars?.[0]?.tasks.map((task) => (
                <Box
                  className="ellipsis"
                  sx={{
                    p: 1,
                    fontSize: "14px",
                    height,
                    borderBottom,
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                  key={task.id}
                >
                  {task.name}
                </Box>
              ))}
            </Box>
            <Box
              sx={{ overflow: "scroll", width: "calc(100% - 150px)" }}
              className="flexStart"
            >
              {calendars?.map((calendar) => (
                <Box
                  key={calendar.date}
                  sx={{ textAlign: "center", borderLeft }}
                >
                  <Box
                    sx={{
                      p: 1,
                      width: "40px",
                      borderBottom,
                      height,
                    }}
                  >
                    {dayjs(calendar.date).format("D")}
                  </Box>
                  {calendar.tasks.map((task) => (
                    <Box
                      sx={{
                        p: 1,
                        width: "40px",
                        cursor: "pointer",
                        borderBottom,
                        height,
                        "&:last-child": {
                          borderBottom: "none",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.23)",
                        },
                      }}
                      key={task.id}
                    >
                      {getStateIcon(task, calendar.date)}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
      {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(calendars, null, 4)}</pre>
      )}
    </>
  );
};
export default CalendarList;
