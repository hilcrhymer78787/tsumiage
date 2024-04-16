import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";

import { Calendar } from "@/data/work/useReadWorkMonth";
import CheckIcon from "@mui/icons-material/Check";
import Pagination from "@/components/calendar/Pagination";
import RemoveIcon from "@mui/icons-material/Remove";
import { Task } from "@/data/task/useReadTasks";
import dayjs from "dayjs";
import { useCreateWork } from "@/data/work/useCreateWork";

type Props = {
  calendars: Calendar[] | null;
  getCalendarData: (year?: number, month?: number) => Promise<void>;
};
const CalendarList = ({ calendars, getCalendarData }: Props) => {
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
                    <CalendarItem
                      task={task}
                      date={calendar.date}
                      key={task.id}
                      getCalendarData={getCalendarData}
                    />
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

type CalendarItemProps = {
  task: Task;
  date: string;
  getCalendarData: (year?: number, month?: number) => Promise<void>;
};
const CalendarItem = ({ task, date, getCalendarData }: CalendarItemProps) => {
  const {
    work: { state },
    createdAt,
  } = task;

  const [isLoading, setIsLoading] = useState(false);

  const { createWork } = useCreateWork();

  const apiWorkCreate = async () => {
    setIsLoading(true);
    const newState = state === 0 ? 1 : state === 1 ? 2 : 0;
    const res = await createWork({
      id: task.work.id,
      date,
      state: newState,
      task_id: task.id,
    });
    if (res) await getCalendarData();
    setIsLoading(false);
  };

  const getStateIcon = useMemo(() => {
    if (dayjs(date).isAfter(dayjs(), "day")) return <></>;
    if (dayjs(createdAt).isAfter(dayjs(date), "day")) return <></>;
    if (isLoading) return <CircularProgress size={24} />;
    if (state === 0) return <CheckIcon color="error"/>;
    if (state === 1)
      return <CheckIcon color="primary" />;
    if (state === 2)
      return <RemoveIcon color="primary" />;
  }, [createdAt, date, state, isLoading]);

  return (
    <Box
      sx={{
        cursor: "pointer",
        borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
        height: "40px",
        "&:last-child": {
          borderBottom: "none",
        },
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.23)",
        },
      }}
    >
      <Button onClick={apiWorkCreate} sx={{ minWidth: "40px", width: "40px", height: "40px", p: 0 }}>
        {getStateIcon}
      </Button>
    </Box>
  );
};

export default CalendarList;
