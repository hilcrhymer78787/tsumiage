import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMemo, useState } from "react";

import { Calendar } from "@/data/work/useReadWorkMonth";
import CheckIcon from "@mui/icons-material/Check";
import Pagination from "@/components/calendar/Pagination";
import RemoveIcon from "@mui/icons-material/Remove";
import { Task } from "@/data/task/useReadTasks";
import dayjs from "dayjs";
import { navWidth } from "@/layouts/default";
import { useCreateWork } from "@/data/work/useCreateWork";
import { useMedia } from "@/data/media/useMedia";

type Props = {
  calendars: Calendar[] | null;
  getCalendarData: (year?: number, month?: number) => Promise<void>;
};
const CalendarList = ({ calendars, getCalendarData }: Props) => {
  const { isPc } = useMedia();
  const borderTop = "1px solid rgba(255, 255, 255, 0.23)";
  const borderRight = "1px solid rgba(255, 255, 255, 0.23)";

  const getStickyCellStyle = (width: number, zIndex: number) => {
    return {
      position: "sticky",
      left: 0,
      width,
      zIndex,
      background: "#121212",
      borderRight,
    };
  };

  return (
    <>
      <Pagination
        setCalendarData={(date) => {
          getCalendarData(date.year, date.month);
        }}
      />
      <TableContainer
        sx={{
          width: `calc(100vw - ${isPc ? navWidth : "0px"})`,
          height: `calc(100vh - ${isPc ? 60 : 180}px)`,
          borderTop,
        }}
      >
        <Table
          stickyHeader
          sx={{ width: `${150 + 40 * Number(calendars?.length)}px` }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={getStickyCellStyle(150, 2)}></TableCell>
              {calendars?.map((calendar, i) => (
                <TableCell
                  align="center"
                  key={i}
                  sx={{
                    p: 1,
                    borderRight,
                    "&:last-child": {
                      borderRight: "none",
                    },
                  }}
                >
                  {dayjs(calendar.date).format("D")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {calendars?.[0].tasks.map((task) => {
              return (
                <TableRow key={task.id}>
                  <TableCell sx={getStickyCellStyle(150, 1)}>
                    <Box
                      sx={{ width: "150px", paddingLeft: 1 }}
                      className="ellipsis"
                    >
                      {task.name}
                    </Box>
                  </TableCell>
                  {calendars.map((calendar) => {
                    const targetTask = calendar.tasks.find(
                      (elm) => elm.id === task.id
                    );
                    const date = calendar.date;
                    return (
                      <TableCell
                        align="center"
                        key={calendar.date}
                        sx={{
                          borderRight,
                          "&:last-child": {
                            borderRight: "none",
                          },
                        }}
                      >
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
      {/* {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(calendars, null, 4)}</pre>
      )} */}
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
