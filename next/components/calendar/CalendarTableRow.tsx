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
import { useState } from "react";

type CalendarTableRowProps = {
  task: Task;
  calendars: Calendar[];
  readonly?: boolean;
};
const CalendarTableRow = ({
  task,
  calendars,
  readonly,
}: CalendarTableRowProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <TableRow>
      <TableCell sx={{ ...stickyStyle, zIndex: 2 }}>
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
        <TableCell key={calendar.date} align="center">
          <CalendarTableCell
            taskId={task.id}
            calendar={calendar}
            readonly={readonly}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
export default CalendarTableRow;
