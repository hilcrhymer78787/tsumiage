import Pagination, {
  PAGINATION_HEIGHT,
} from "@/components/calendar/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { BOTTOM_NAV_HEIGHT } from "@/plugins/theme";
import { Calendar } from "@/data/work/useReadWorkMonth";
import CalendarTableRow from "@/components/calendar/CalendarTableRow";
import { NAV_WIDTH } from "@/layouts/default";
import dayjs from "dayjs";
import { useMedia } from "@/data/media/useMedia";
import { useMemo } from "react";

export const TASK_NAME_WIDTH = 150;
export const CELL_SIZE = 40;
export const stickyStyle = {
  position: "sticky",
  left: 0,
  width: TASK_NAME_WIDTH,
  background: "#121212",
};
type Props = {
  calendars: Calendar[] | null;
  getCalendarData: () => Promise<void>;
};
const CalendarTable = ({ calendars, getCalendarData }: Props) => {
  const { isPc } = useMedia();

  const tableWidth = useMemo(() => {
    const size = TASK_NAME_WIDTH + CELL_SIZE * Number(calendars?.length);
    return `${size}px`;
  }, [calendars?.length]);

  return (
    <>
      <Pagination />
      <TableContainer
        sx={{
          width: `calc(100vw - ${isPc ? NAV_WIDTH : 0}px)`,
          height: `calc(100vh - ${PAGINATION_HEIGHT}px - ${
            isPc ? 0 : (BOTTOM_NAV_HEIGHT + 50)
          }px - env(safe-area-inset-bottom))`,
          // TODO +40を消したい
        }}
      >
        <Table stickyHeader sx={{ width: tableWidth }}>
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
              <CalendarTableRow
                key={task.id}
                task={task}
                calendars={calendars}
                getCalendarData={getCalendarData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CalendarTable;
