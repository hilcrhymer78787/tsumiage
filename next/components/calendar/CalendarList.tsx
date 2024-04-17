import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";

import { Calendar } from "@/data/work/useReadWorkMonth";
import CheckIcon from "@mui/icons-material/Check";
import Pagination from "@/components/calendar/Pagination";
import RemoveIcon from "@mui/icons-material/Remove";
import { Task } from "@/data/task/useReadTasks";
import dayjs from "dayjs";
import { useCreateWork } from "@/data/work/useCreateWork";
import { useRouter } from "next/router";

type Props = {
  calendars: Calendar[] | null;
  getCalendarData: (year?: number, month?: number) => Promise<void>;
};
const CalendarList = ({ calendars, getCalendarData }: Props) => {
  const router = useRouter();
  const year = () => {
    return Number(router.query.year);
  };
  const month = () => {
    return Number(router.query.month);
  };
  const day = () => {
    return Number(router.query.day);
  };
  const firstDay = () => {
    return dayjs(`${year()}/${month()}/1`, "YYYY-MM-DD").day();
  };
  const lastDay = () => {
    return dayjs(`${year()}-${month()}-01`).endOf("month").date();
  };

  const height = "40px";
  const borderBottom = "1px solid rgba(255, 255, 255, 0.23)";
  const borderLeft = "1px solid rgba(255, 255, 255, 0.23)";

  const getStickyCellStyle = (width: number, zIndex: number) => {
    return {
      position: "sticky",
      left: 0,
      width,
      zIndex,
      background: "#121212",
    };
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
          <TableContainer sx={{ height: "40vh" }}>
            <Table stickyHeader sx={{ width: "2500px" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={getStickyCellStyle(150, 110)}></TableCell>
                  {calendars?.map((calendar, i) => (
                    <TableCell key={i}>
                      {dayjs(calendar.date).format("D")}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {calendars?.[0].tasks.map((task) => {
                  return (
                    <TableRow key={task.id}>
                      <TableCell sx={getStickyCellStyle(150, 100)}>
                        <Box sx={{ width: "118px" }} className="ellipsis">
                          {task.name}
                        </Box>
                      </TableCell>
                      {calendars.map((calendar) => {
                        const targetTask = calendar.tasks.find(
                          (elm) => elm.id === task.id
                        );
                        const date = calendar.date;
                        return (
                          <TableCell key={calendar.date}>
                            {!!targetTask && (
                              <CalendarItem
                                task={targetTask}
                                date={date}
                                getCalendarData={getCalendarData}
                              />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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
    if (state === 0) return <CheckIcon color="error" />;
    if (state === 1) return <CheckIcon color="primary" />;
    if (state === 2) return <RemoveIcon color="primary" />;
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
      <Button
        onClick={apiWorkCreate}
        sx={{ minWidth: "40px", width: "40px", height: "40px", p: 0 }}
      >
        {getStateIcon}
      </Button>
    </Box>
  );
};

export default CalendarList;
