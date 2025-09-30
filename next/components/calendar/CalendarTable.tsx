import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination, { PAGINATION_HEIGHT } from "@/components/calendar/Pagination";

import { BOTTOM_NAV_HEIGHT } from "@/plugins/theme";
import CalendarTableRow from "@/components/calendar/CalendarTableRow";
import { NAV_WIDTH } from "@/layouts/default";
import dayjs from "dayjs";
import { useMedia } from "@/data/media/useMedia";
import { useCallback, useMemo, useState } from "react";
import { Calendar } from "@/data/types/calendar";

export const TASK_NAME_WIDTH = 150;

export const CELL_SIZE = 40;

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
  const { isPc } = useMedia();

  const tableWidth = useMemo(() => {
    const size = TASK_NAME_WIDTH + CELL_SIZE * Number(calendars?.length);
    return `${size}px`;
  }, [calendars?.length]);

  const [hoverColDate, setHoverColDate] = useState("");

  const onSetHoverColDate = (date: string) => {
    setHoverColDate(isPc ? date : "");
  };

  const getBgColor = useCallback(
    (date: string) => (hoverColDate === date ? "rgba(60, 60, 60) !important" : "myBgColor.main"),
    [hoverColDate]
  );

  return (
    <>
      <Pagination onClickReset={onClickReset} resetWorkLoading={resetWorkLoading} />
      <TableContainer
        sx={{
          width: `calc(100vw - ${isPc ? NAV_WIDTH : 0}px)`,
          height: `calc(100vh - ${PAGINATION_HEIGHT}px - ${
            isPc ? 0 : BOTTOM_NAV_HEIGHT + 50
          }px - env(safe-area-inset-bottom))`,
        }}
      >
        <Table
          stickyHeader
          sx={{
            width: tableWidth,
            "& .MuiTableCell-root": {
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "myBgColor.main",
            },
            "& .MuiTableRow-root > .MuiTableCell-root:first-of-type": {
              position: "sticky",
              left: 0,
              width: TASK_NAME_WIDTH,
              zIndex: 2,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ zIndex: "3 !important" }}>
                <Box
                  width={`${TASK_NAME_WIDTH}px`}
                  paddingLeft={1}
                  color="primary.main"
                  className="ellipsis"
                >
                  {userName}
                </Box>
              </TableCell>
              {calendars?.map(({ date }) => (
                <TableCell
                  align="center"
                  key={date}
                  sx={{ backgroundColor: getBgColor(date) }}
                  onMouseEnter={() => onSetHoverColDate(date)}
                  onMouseLeave={() => onSetHoverColDate("")}
                >
                  {dayjs(date).format("D")}
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
                getBgColor={getBgColor}
                setHoverColDate={onSetHoverColDate}
                sx={{
                  "&:hover .MuiTableCell-root": {
                    backgroundColor: isPc ? "rgba(60, 60, 60)" : "myBgColor.main",
                  },
                  "& .MuiTableCell-root:hover, & .MuiButton-root:hover": {
                    backgroundColor: "rgba(120, 120, 120)",
                    cursor: "pointer",
                  },
                }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CalendarTable;
