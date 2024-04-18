import {
  Box,
  Button,
  CircularProgress,
  Divider,
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
import dayjs from "dayjs";
import { useCreateWork } from "@/data/work/useCreateWork";
import { useMedia } from "@/data/media/useMedia";

//TODO ページ全体のリファクタリング
const TASK_NAME_WIDTH = 150;
const CELL_SIZE = 40;
type Props = {
  calendars: Calendar[] | null;
  getCalendarData: () => Promise<void>;
};
const CalendarList = ({ calendars, getCalendarData }: Props) => {
  const { isPc } = useMedia();

  const stickyStyle = {
    position: "sticky",
    left: 0,
    width: TASK_NAME_WIDTH,
    background: "#121212",
  };

  return (
    <>
      <Pagination />
      <TableContainer
        sx={{
          width: `calc(100vw - ${isPc ? NAV_WIDTH : 0}px)`,
          //TODO 正確な値を計算
          height: `calc(100vh - ${isPc ? 60 : 200}px)`,
        }}
      >
        <Table
          stickyHeader
          sx={{
            width: `${
              TASK_NAME_WIDTH + CELL_SIZE * Number(calendars?.length)
            }px`,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...stickyStyle, zIndex: 3 }}></TableCell>
              {calendars?.map((calendar) => (
                <TableCell
                  align="center"
                  key={calendar.date}
                  sx={{ height: `${CELL_SIZE}px` }}
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
                  <TableCell key={calendar.date} align="center">
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
    <Button
      onClick={apiWorkCreate}
      sx={{
        minWidth: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
        borderRadius: 0,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.23)",
        },
      }}
    >
      {getStateIcon}
    </Button>
  );
};

export default CalendarList;
