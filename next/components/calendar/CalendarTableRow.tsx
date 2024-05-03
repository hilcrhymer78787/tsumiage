import {
  Box,
  TableCell,
  TableRow,
} from "@mui/material";
import { TASK_NAME_WIDTH, stickyStyle } from "@/components/calendar/CalendarTable";

import { Calendar } from "@/data/work/useReadWorkMonth";
import CalendarTableCell from "@/components/calendar/CalendarTableCell";
import { Task } from "@/data/task/useReadTasks";

type CalendarTableRowProps = {
  task: Task;
  calendars: Calendar[];
  getCalendarData: () => Promise<void>;
  readonly?: boolean;
};
const CalendarTableRow = ({
  task,
  calendars,
  getCalendarData,
  readonly,
}: CalendarTableRowProps) => {
  return (
    <TableRow>
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
          <CalendarTableCell
            taskId={task.id}
            calendar={calendar}
            getCalendarData={getCalendarData}
            readonly={readonly}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
export default CalendarTableRow;