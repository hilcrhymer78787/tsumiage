import React, { useState, useEffect } from 'react';
import { api } from '@/plugins/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import CreateWork from '@/components/task/CreateWork';
import CreateTask from '@/components/task/CreateTask';
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
    CardActionArea,
    IconButton,
    Dialog,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    CircularProgress
} from '@mui/material';
type Props = {
    date: string,
}
export default function TaskList(props: Props) {
    const [createWorkDialog, setCreateWorkDialog] = useState(false as boolean);
    const [createTaskDialog, setCreateTaskDialog] = useState(false as boolean);
    const [focusTask, setFocusTask] = useState(null as apiTaskReadResponseTaskType | null);
    const [tasks, setTasks] = useState([] as apiTaskReadResponseTaskType[]);
    const [taskReadLoading, seTtaskReadLoading] = useState(false as boolean);
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);

    const onFocusTask = (e: React.MouseEvent<HTMLElement>) => {
        const clickedIndex = e.currentTarget.dataset.index;
        setFocusTask(tasks[clickedIndex]);
        setCreateWorkDialog(true);
    };

    const onNewTask = () => {
        setFocusTask(null);
        setCreateTaskDialog(true);
    };

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

    const workDelete = (e) => {
        const task = tasks[e.currentTarget.dataset.index];
        if (!confirm(`${props.date}、「${task.name}」の実績を削除しますか？`)) {
            return;
        }
        const apiParam: apiWorkDeleteRequestType = {
            date: props.date,
            task_id: task.id
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/work/delete`,
            method: "DELETE",
            data: apiParam
        };
        setWorkDeleteLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                taskRead();
            })
            .finally(() => {
                setWorkDeleteLoading(false);
            });
    };

    const workCreate = (e) => {
        const task = tasks[e.currentTarget.dataset.index];
        const apiParam: apiWorkCreateRequestType = {
            id: task.work.id,
            date: props.date,
            task_id: task.id,
            minute: task.default_minute,
            memo: '',
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/work/create`,
            method: "POST",
            data: apiParam
        };
        setWorkCreateLoading(true);
        api(requestConfig)
            .then((res) => {
                taskRead();
            })
            .finally(() => {
                setWorkCreateLoading(false);
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
                        <IconButton onClick={onNewTask} component="span">
                            <AddIcon color="primary" />
                        </IconButton>
                    }
                    sx={{ bgcolor: '#1976d2', color: 'white' }}
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
                        {tasks.map((task, index) => (
                            <CardActionArea key={index.toString()}>
                                <ListItem
                                    secondaryAction={task.work.id ?
                                        <CheckBoxIcon
                                            data-index={index}
                                            onClick={workDelete}
                                            color="primary"
                                        />
                                        :
                                        <CheckBoxOutlineBlankIcon
                                            data-index={index}
                                            onClick={workCreate}
                                            color="disabled"
                                        />
                                    }>
                                    <ListItemAvatar onClick={onFocusTask} data-index={index}>
                                        <Avatar sx={{ bgcolor: Boolean(task.work.id) ? '#1976d2' : '' }}>
                                            <TaskOutlinedIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        onClick={onFocusTask} data-index={index}
                                        primary={task.name} secondary={`想定:${task.default_minute}分` + ` 実績:${task.work?.minute}分`}
                                    />
                                </ListItem>
                            </CardActionArea>
                        ))}
                    </CardContent>
                }
            </Card>

            <Dialog open={createWorkDialog} onClose={() => { setCreateWorkDialog(false); }}>
                {createWorkDialog &&
                    <CreateWork
                        onCloseMyself={() => { setCreateWorkDialog(false); }}
                        openCreateTaskDialog={() => { setCreateTaskDialog(true); }}
                        date={props.date}
                        taskRead={taskRead}
                        focusTask={focusTask}
                    />
                }
            </Dialog>

            <Dialog open={createTaskDialog} onClose={() => { setCreateTaskDialog(false); }}>
                {createTaskDialog &&
                    <CreateTask
                        onCloseMyself={() => {
                            setCreateTaskDialog(false);
                            setCreateWorkDialog(false);
                        }}
                        taskRead={taskRead}
                        focusTask={focusTask}
                    />
                }
            </Dialog>
            {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
        </>
    );
}