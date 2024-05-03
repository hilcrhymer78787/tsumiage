import { Box, Button, CircularProgress } from "@mui/material";
import { useMemo, useState } from "react";

import { CELL_SIZE } from "@/components/calendar/CalendarTable";
import { Calendar } from "@/data/work/useReadWorkMonth";
import WorkStateIcon from "@/components/calendar/WorkStateIcon";
import dayjs from "dayjs";
import { useCreateWork } from "@/data/work/useCreateWork";

type CalendarTableCellProps = {
  taskId: number;
  calendar: Calendar;
  readonly?: boolean;
};
const CalendarTableCell = ({
  taskId,
  calendar,
  readonly,
}: CalendarTableCellProps) => {
  const task = calendar.tasks.find((task) => task.id === taskId);
  const { date } = calendar;
  const createdAt = task?.createdAt;

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(task?.work.state ?? 0);

  const { createWork } = useCreateWork();

  const apiWorkCreate = async () => {
    if (!task) return;
    setIsLoading(true);
    const newState = state === 0 ? 1 : state === 1 ? 2 : 0;
    const res = await createWork({
      id: task.work.id,
      date,
      state: newState,
      task_id: task.id,
    });
    if (res) setState(newState);
    setIsLoading(false);
  };

  if (dayjs(date).isAfter(dayjs(), "day"))
    return (
      <Box sx={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}></Box>
    );
  if (dayjs(createdAt).isAfter(dayjs(date), "day"))
    return (
      <Box sx={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}></Box>
    );
  if (isLoading)
    return (
      <Box
        className="flexCenter"
        sx={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
      >
        <CircularProgress size={24} />
      </Box>
    );

  return (
    <Button
      onClick={apiWorkCreate}
      disabled={readonly}
      sx={{
        minWidth: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
        borderRadius: 0,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.23)",
        },
      }}
    >
      <WorkStateIcon state={state} />
    </Button>
  );
};
export default CalendarTableCell;
