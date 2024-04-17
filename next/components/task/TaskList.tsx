import {
  Card,
  CardContent,
  CardHeader,
  SxProps
} from "@mui/material";

import { Task } from "@/data/task/useReadTasks";
import TaskItem from "@/components/task/TaskItem";

type Props = {
  date: string;
  readonly: boolean;
  tasks: Task[];
  apiTaskRead: () => void;
  title: string;
  sx?:SxProps
};
const TaskList = ({
  date,
  readonly,
  tasks,
  apiTaskRead,
  title,
  sx,
}: Props) => {
  return (
      <Card sx={{...sx}}>
        <CardHeader title={title}/>
        <CardContent sx={{ p: "0 !important" }}>
          {tasks.map((task, index) => (
            <TaskItem
              task={task}
              date={date}
              apiTaskRead={apiTaskRead}
              key={index.toString()}
              readonly={readonly}
            />
          ))}
        </CardContent>
      </Card>
  );
};
export default TaskList;
