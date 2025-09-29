import { Box, Dialog, DialogTitle, SxProps, TableCell, TableRow } from "@mui/material";
import { TASK_NAME_WIDTH } from "@/components/calendar/CalendarTable";

import { Calendar } from "@/data/types/calendar";
import CalendarTableCell from "@/components/calendar/CalendarTableCell";
import { useState } from "react";
import { Task } from "@/data/types/task";

const CalendarTableRow = ({
  task,
  calendars,
  readonly,
  getBgColor,
  setHoverColDate,
  sx,
}: {
  task: Task;
  calendars: Calendar[];
  readonly?: boolean;
  getBgColor: (date: string) => string;
  setHoverColDate: (date: string) => void;
  sx?: SxProps;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TableRow sx={{ ...sx }}>
      <TableCell>
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
          sx={{ backgroundColor: getBgColor(calendar.date) }}
        >
          <CalendarTableCell taskId={task.id} calendar={calendar} readonly={readonly} />
        </TableCell>
      ))}
    </TableRow>
  );
};
export default CalendarTableRow;
