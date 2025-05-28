import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  TASK_NAME_WIDTH,
  stickyStyle,
} from "@/components/calendar/CalendarTable";

import { Calendar } from "@/data/work/useReadWorkMonth";
import CalendarTableCell from "@/components/calendar/CalendarTableCell";
import { Task } from "@/data/task/useReadTasks";
import { Dispatch, SetStateAction, useState } from "react";
import { useMedia } from "@/data/media/useMedia";

const CalendarTableRow = ({
  task,
  calendars,
  readonly,
  hoverColDate,
  setHoverColDate,
}: {
  task: Task;
  calendars: Calendar[];
  readonly?: boolean;
  hoverColDate: string;
  setHoverColDate: (date: string) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isPc } = useMedia();

  return (
    <TableRow
      sx={{
        "&:hover .MuiTableCell-root": {
          backgroundColor: isPc ? "rgba(60, 60, 60)" : "#121212",
        },
      }}
    >
      <TableCell
        sx={{
          ...stickyStyle,
          zIndex: 2,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.23)",
            cursor: "pointer",
          },
        }}
      >
        <Box
          onClick={() => setIsDialogOpen(true)}
          sx={{ width: `${TASK_NAME_WIDTH}px`, paddingLeft: 1 }}
          className="ellipsis"
        >
          {task.name}
        </Box>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>{task.name}</DialogTitle>
          {/* <DialogContent>
            {process.env.NODE_ENV === "development" && (
              <pre>{JSON.stringify(calendars, null, 4)}</pre>
            )}
          </DialogContent> */}
        </Dialog>
      </TableCell>
      {calendars.map((calendar) => (
        <TableCell
          key={calendar.date}
          onMouseEnter={() => setHoverColDate(calendar.date)}
          onMouseLeave={() => setHoverColDate("")}
          align="center"
        >
          <CalendarTableCell
            taskId={task.id}
            calendar={calendar}
            readonly={readonly}
            hovered={hoverColDate === calendar.date}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
export default CalendarTableRow;
