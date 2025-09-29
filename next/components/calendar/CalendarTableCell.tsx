import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";

import { Calendar } from "@/data/types/calendar";
import WorkStateIcon from "@/components/calendar/WorkStateIcon";
import dayjs from "dayjs";
import { useCreateWork } from "@/data/work/useCreateWork";

const CalendarTableCell = ({
  taskId,
  calendar,
  readonly,
}: {
  taskId: number;
  calendar: Calendar;
  readonly?: boolean;
}) => {
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
      date,
      state: newState,
      task_id: task.id,
    });
    if (res) setState(newState);
    setIsLoading(false);
  };

  if (dayjs(date).isAfter(dayjs(), "day")) return <Box />;
  if (dayjs(createdAt).isAfter(dayjs(date), "day")) return <Box />;
  if (isLoading)
    return (
      <Box className="flexCenter">
        <CircularProgress size={24} />
      </Box>
    );

  return (
    <Button
      onClick={apiWorkCreate}
      disabled={readonly}
      sx={{
        p: 0,
        borderRadius: 0,
        minWidth: "100%",
        height: "100%",
      }}
    >
      <WorkStateIcon state={state} />
    </Button>
  );
};
export default CalendarTableCell;
