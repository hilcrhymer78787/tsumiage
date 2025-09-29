import { Card, CardContent, CardHeader } from "@mui/material";
import TaskItem from "@/components/task/TaskItem";
import { Task } from "@/data/types/task";

const TaskList = ({
  date,
  tasks,
  title,
  apiTaskRead,
}: {
  date: string;
  tasks: Task[];
  title: string;
  apiTaskRead: () => void;
}) => {
  if (!tasks?.length) return <></>;
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent sx={{ p: "0 !important" }}>
        {tasks.map((task) => (
          <TaskItem task={task} date={date} apiTaskRead={apiTaskRead} key={task.id} />
        ))}
      </CardContent>
    </Card>
  );
};
export default TaskList;
