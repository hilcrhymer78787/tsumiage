import React from "react";
import CreateTask from "@/components/task/CreateTask";
import TaskItem from "@/components/task/TaskItem";
import { apiTaskReadResponseTaskType } from "@/types/api/task/read/response";
import AddIcon from "@mui/icons-material/Add";
import { useMount } from "react-use";
import { useTaskApi } from "@/data/task";
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Dialog,
    CircularProgress
} from "@mui/material";
type Props = {
  date: string,
  userId: number,
  readonly: boolean,
}
export default function TaskList (props: Props) {
    const { taskRead, taskReadLoading } = useTaskApi();
    const [createTaskDialog, setCreateTaskDialog] = React.useState<boolean>(false);
    const [tasks, setTasks] = React.useState<apiTaskReadResponseTaskType[]>([]);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            const res = await taskRead({
                date: props.date,
                user_id: props.userId,
            });
            setTasks(res.data.tasks);
            setErrorMessage(null);
            if(!res.data.tasks)setErrorMessage("登録されているタスクはありません");
        } catch (e) {
            setTasks([]);
            setErrorMessage("エラーが発生しました");
        }
    };

    useMount(() => fetchTasks());

    return (
        <>
            <Card>
                <CardHeader
                    action={!Boolean(props.readonly) && (
                        <IconButton onClick={() => setCreateTaskDialog(true)} component="span">
                            <AddIcon color="primary" />
                        </IconButton>
                    )}
                    title="タスク"
                    subheader={props.date}
                />
                {Boolean(errorMessage) && (
                    <CardContent
                        sx={{
                            textAlign: "center",
                            p: "20px !important"
                        }}>{errorMessage}
                    </CardContent>
                )}
                {taskReadLoading && !Boolean(tasks.length) && (
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: "30px"
                        }}>
                        <CircularProgress />
                    </CardContent>
                )}
                {Boolean(tasks.length) && (
                    <CardContent sx={{ p: "0 !important" }}>
                        {tasks.map((task: apiTaskReadResponseTaskType, index: number) => (
                            <TaskItem
                                task={task}
                                date={props.date}
                                fetchTasks={fetchTasks}
                                key={index.toString()}
                                readonly={props.readonly}
                            />
                        ))}
                    </CardContent>
                )}
            </Card>

            <Dialog open={createTaskDialog} onClose={() => setCreateTaskDialog(false)}>
                {createTaskDialog && (
                    <CreateTask
                        onCloseMyself={() => {
                            setCreateTaskDialog(false);
                            fetchTasks();
                        }}
                        task={null}
                    />
                )}
            </Dialog>
        </>
    );
}