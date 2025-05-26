import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination, {
  PAGINATION_HEIGHT,
} from "@/components/calendar/Pagination";

import { BOTTOM_NAV_HEIGHT } from "@/plugins/theme";
import { Calendar } from "@/data/work/useReadWorkMonth";
import CalendarTableRow from "@/components/calendar/CalendarTableRow";
import { NAV_WIDTH } from "@/layouts/default";
import dayjs from "dayjs";
import { useMedia } from "@/data/media/useMedia";
import { useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";

export const TASK_NAME_WIDTH = 150;
export const CELL_SIZE = 40;
export const stickyStyle = {
  position: "sticky",
  left: 0,
  width: TASK_NAME_WIDTH,
  background: "#121212",
};
const CalendarTable = ({
  userName,
  calendars,
  readonly,
  resetWorkLoading,
  onClickReset,
}: {
  calendars: Calendar[] | null;
  userName?: string;
  readonly?: boolean;
  resetWorkLoading?: boolean;
  onClickReset?: () => void;
}) => {
  const theme = useTheme();
  const { isPc } = useMedia();
  const tableWidth = useMemo(() => {
    const size = TASK_NAME_WIDTH + CELL_SIZE * Number(calendars?.length);
    return `${size}px`;
  }, [calendars?.length]);
  const [hoverColDate, setHoverColDate] = useState("");

  return (
    <>
      <Pagination
        onClickReset={onClickReset}
        resetWorkLoading={resetWorkLoading}
      />
      <TableContainer
        sx={{
          width: `calc(100vw - ${isPc ? NAV_WIDTH : 0}px)`,
          height: `calc(100vh - ${PAGINATION_HEIGHT}px - ${
            isPc ? 0 : BOTTOM_NAV_HEIGHT + 50
          }px - env(safe-area-inset-bottom))`,
          // TODO +40を消したい
        }}
      >
        <Table stickyHeader sx={{ width: tableWidth }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...stickyStyle, zIndex: 3 }}>
                <Box
                  sx={{
                    width: `${TASK_NAME_WIDTH}px`,
                    paddingLeft: 1,
                    color: theme.palette.primary.main,
                  }}
                  className="ellipsis"
                >
                  {userName}
                </Box>
              </TableCell>
              {calendars?.map((calendar) => (
                <TableCell
                  align="center"
                  key={calendar.date}
                  sx={{
                    height: `${CELL_SIZE}px`,
                    backgroundColor:
                      hoverColDate === calendar.date
                        ? "rgba(60, 60, 60)"
                        : "#121212",
                  }}
                  onMouseEnter={() => setHoverColDate(calendar.date)}
                  onMouseLeave={() => setHoverColDate("")}
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
                readonly={readonly}
                hoverColDate={hoverColDate}
                setHoverColDate={setHoverColDate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CalendarTable;
