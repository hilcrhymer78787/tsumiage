import {
  Card,
  CardContent,
  CardHeader,
  SxProps
} from "@mui/material";

import ErrTxt from "@/components/common/ErrTxt";
import Loading from "@/components/common/Loading";
import { Task } from "@/data/task/useReadTasks";
import TaskItem from "@/components/task/TaskItem";

;

type Props = {
  date: string;
  readonly: boolean;
  tasks: Task[] | null;
  apiTaskRead: () => void;
  readTasksLoading: boolean;
  readTasksError: string;
  title: string;
  sx?:SxProps
};
const TaskList = ({
  date,
  readonly,
  tasks,
  apiTaskRead,
  readTasksLoading,
  readTasksError,
  title,
  sx,
}: Props) => {

  return (
      <Card sx={{...sx}}>
        <CardHeader title={title}/>
        <CardContent sx={{ p: "0 !important" }}>
          <ErrTxt txt={readTasksError} />
          {readTasksLoading && !tasks?.length && <Loading />}
          {tasks?.map((task, index) => (
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
