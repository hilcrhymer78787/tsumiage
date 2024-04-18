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
import { NAV_WIDTH } from "@/layouts/default";
import Pagination from "@/components/calendar/Pagination";
import RemoveIcon from "@mui/icons-material/Remove";
import { Task } from "@/data/task/useReadTasks";
import dayjs from "dayjs";
import { useCreateWork } from "@/data/work/useCreateWork";
import { useMedia } from "@/data/media/useMedia";

//TODO ページ全体のリファクタリング
const TASK_NAME_WIDTH = 150;
type Props = {
  calendars: Calendar[] | null;
  getCalendarData: () => Promise<void>;
};
const CalendarList = ({ calendars, getCalendarData }: Props) => {
  const { isPc } = useMedia();
  const borderTop = "1px solid rgba(255, 255, 255, 0.23)";
  const borderRight = "1px solid rgba(255, 255, 255, 0.23)";

  const stickyStyle = {
    position: "sticky",
    left: 0,
    width: TASK_NAME_WIDTH,
    background: "#121212",
    borderRight,
  };

  return (
    <>
      <Pagination />
      <TableContainer
        sx={{
          width: `calc(100vw - ${isPc ? NAV_WIDTH : 0}px)`,
          //TODO 正確な値を計算
          height: `calc(100vh - ${isPc ? 60 : 200}px)`,
          borderTop,
        }}
      >
        <Table
          stickyHeader
          sx={{
            width: `${TASK_NAME_WIDTH + 40 * Number(calendars?.length)}px`,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...stickyStyle, zIndex: 3 }}></TableCell>
              {calendars?.map((calendar) => (
                <TableCell
                  align="center"
                  key={calendar.date}
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
            {calendars?.[0].tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell sx={{ ...stickyStyle, zIndex: 2 }}>
                  <Box
                    sx={{ width: `${TASK_NAME_WIDTH}px`, paddingLeft: 1 }}
                    className="ellipsis"
                  >
                    {task.name}
                  </Box>
                </TableCell>
                {calendars.map((calendar) => (
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
                    <CalendarItem
                      taskId={task.id}
                      calendar={calendar}
                      getCalendarData={getCalendarData}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
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
  taskId: number;
  calendar: Calendar;
  getCalendarData: () => Promise<void>;
};
const CalendarItem = ({
  taskId,
  calendar,
  getCalendarData,
}: CalendarItemProps) => {
  const task = calendar.tasks.find((task) => task.id === taskId);
  const { date } = calendar;
  const state = task?.work.state;
  const createdAt = task?.createdAt;

  const [isLoading, setIsLoading] = useState(false);

  const { createWork } = useCreateWork();

  const apiWorkCreate = async () => {
    if (!task) return;
    setIsLoading(true);
    const newState = state === 0 ? 1 : state === 1 ? 2 : 0;
    const id = task.work.id;
    const task_id = task.id;
    const res = await createWork({ id, date, state: newState, task_id });
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
