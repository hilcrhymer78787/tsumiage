import React, { useState, useEffect } from 'react';
import { api } from '@/plugins/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import CreateWork from '@/components/task/CreateWork';
import CreateTask from '@/components/task/CreateTask';
import TaskItem from '@/components/task/TaskItem';
import { apiTaskReadRequestType } from '@/types/api/task/read/request';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import { apiWorkDeleteRequestType } from '@/types/api/work/delete/request';
import { apiWorkCreateRequestType } from '@/types/api/work/create/request';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AddIcon from '@mui/icons-material/Add';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Dialog,
    CircularProgress
} from '@mui/material';
type Props = {
    date: string,
}
export default function TaskList(props: Props) {
    const [createTaskDialog, setCreateTaskDialog] = useState(false as boolean);
    const [tasks, setTasks] = useState([] as apiTaskReadResponseTaskType[]);
    const [taskReadLoading, seTtaskReadLoading] = useState(false as boolean);

    const taskRead = () => {
        const params: apiTaskReadRequestType = {
            date: props.date,
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/read`,
            method: "GET",
            params: params
        };
        seTtaskReadLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                setTasks(res.data.tasks);
            })
            .finally(() => {
                seTtaskReadLoading(false);
            });
    };

    useEffect(() => {
        taskRead();
    }, []);

    return (
        <>
            <Card>
                <CardHeader
                    action={
                        <IconButton onClick={() => { setCreateTaskDialog(true); }} component="span">
                            <AddIcon color="primary" />
                        </IconButton>
                    }
                    title="タスク"
                    subheader={props.date}
                />
                {taskReadLoading && !Boolean(tasks.length) &&
                    <CardContent
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            p: '30px'
                        }}>
                        <CircularProgress />
                    </CardContent>
                }
                {Boolean(tasks.length) &&
                    <CardContent sx={{ p: '0 !important' }}>
                        {tasks.map((task: apiTaskReadResponseTaskType, index: number) => (
                            <TaskItem
                                task={task}
                                date={props.date}
                                taskRead={taskRead}
                                key={index.toString()}
                            />
                        ))}
                    </CardContent>
                }
            </Card>

            <Dialog open={createTaskDialog} onClose={() => { setCreateTaskDialog(false); }}>
                {createTaskDialog &&
                    <CreateTask
                        onCloseMyself={() => {
                            setCreateTaskDialog(false);
                            taskRead();
                        }}
                        task={null}
                    />
                }
            </Dialog>
            {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
        </>
    );
}